import { Injectable } from '@angular/core';
import { Event, EventCategory } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private events: Event[] = [
    {
      id: 1,
      title: 'Spring Festival 🌸',
      description: 'Annual spring celebration with music, food, and fun activities!',
      category: 'social',
      date: new Date('2025-03-15'),
      time: '14:00',
      location: 'Main Campus Quad',
      organizer: 'Student Council',
      maxAttendees: 500,
      currentAttendees: 234,
      status: 'upcoming',
      attendees: []
    },
    {
      id: 2,
      title: 'AI & Machine Learning Workshop',
      description: 'Learn the basics of ML with hands-on exercises and real projects.',
      category: 'workshop',
      date: new Date('2025-02-20'),
      time: '10:00',
      location: 'Tech Building - Room 301',
      organizer: 'CS Department',
      maxAttendees: 30,
      currentAttendees: 28,
      status: 'upcoming',
      attendees: []
    },
    {
      id: 3,
      title: 'Basketball Tournament Finals',
      description: 'Cheer for your favorite team in the championship match!',
      category: 'sports',
      date: new Date('2025-02-18'),
      time: '18:00',
      location: 'Sports Complex',
      organizer: 'Athletics Department',
      maxAttendees: 1000,
      currentAttendees: 567,
      status: 'upcoming',
      attendees: []
    },
    {
      id: 4,
      title: 'Art Exhibition: Student Showcase',
      description: 'Discover amazing artwork created by our talented students.',
      category: 'cultural',
      date: new Date('2025-02-25'),
      time: '17:00',
      location: 'Art Gallery',
      organizer: 'Arts Department',
      maxAttendees: 200,
      currentAttendees: 89,
      status: 'upcoming',
      attendees: []
    },
    {
      id: 5,
      title: 'Career Fair 2025',
      description: 'Meet recruiters from top companies and explore job opportunities.',
      category: 'academic',
      date: new Date('2025-03-01'),
      time: '09:00',
      location: 'Convention Center',
      organizer: 'Career Services',
      maxAttendees: 2000,
      currentAttendees: 1456,
      status: 'upcoming',
      attendees: []
    }
  ];

  private categories: EventCategory[] = [
    { id: 'academic', name: 'Academic', icon: '📚', color: '#3b82f6' },
    { id: 'social', name: 'Social', icon: '🎉', color: '#ec4899' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: '#22c55e' },
    { id: 'cultural', name: 'Cultural', icon: '🎨', color: '#8b5cf6' },
    { id: 'workshop', name: 'Workshop', icon: '💼', color: '#f59e0b' }
  ];

  constructor() { }

  // GET all events
  getAllEvents(): Event[] {
    return this.events;
  }

  // GET event by ID
  getEventById(id: number): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  // CREATE new event
  addEvent(event: Event): void {
    event.id = Math.max(...this.events.map(e => e.id)) + 1;
    event.currentAttendees = 0;
    event.attendees = [];
    this.events.push(event);
  }

  // UPDATE event
  updateEvent(id: number, updatedEvent: Event): void {
    const index = this.events.findIndex(e => e.id === id);
    if (index !== -1) {
      this.events[index] = { ...updatedEvent, id };
    }
  }

  // DELETE event
  deleteEvent(id: number): void {
    this.events = this.events.filter(e => e.id !== id);
  }

  // RSVP to event
  rsvpToEvent(eventId: number, userId: string): boolean {
    const event = this.getEventById(eventId);
    if (event && (!event.maxAttendees || event.currentAttendees < event.maxAttendees)) {
      if (!event.attendees) event.attendees = [];
      if (!event.attendees.includes(userId)) {
        event.attendees.push(userId);
        event.currentAttendees++;
        return true;
      }
    }
    return false;
  }

  // Cancel RSVP
  cancelRsvp(eventId: number, userId: string): void {
    const event = this.getEventById(eventId);
    if (event && event.attendees) {
      const index = event.attendees.indexOf(userId);
      if (index > -1) {
        event.attendees.splice(index, 1);
        event.currentAttendees--;
      }
    }
  }

  // Check if user has RSVPed
  hasRsvped(eventId: number, userId: string): boolean {
    const event = this.getEventById(eventId);
    return event?.attendees?.includes(userId) || false;
  }

  // Filter by category
  filterByCategory(category: string): Event[] {
    if (!category) return this.events;
    return this.events.filter(e => e.category === category);
  }

  // Filter by date range
  filterByDateRange(startDate: Date, endDate: Date): Event[] {
    return this.events.filter(e => e.date >= startDate && e.date <= endDate);
  }

  // Get upcoming events
  getUpcomingEvents(): Event[] {
    const today = new Date();
    return this.events
      .filter(e => e.date >= today && e.status === 'upcoming')
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  // Get categories
  getCategories(): EventCategory[] {
    return this.categories;
  }

  // Get category by ID
  getCategoryById(id: string): EventCategory | undefined {
    return this.categories.find(c => c.id === id);
  }
}
export interface Event {
  id: number;
  title: string;
  description: string;
  category: 'academic' | 'social' | 'sports' | 'cultural' | 'workshop';
  date: Date;
  time: string;
  location: string;
  organizer: string;
  maxAttendees?: number;
  currentAttendees: number;
  imageUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees?: string[]; // Array of user IDs who RSVPed
}

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}
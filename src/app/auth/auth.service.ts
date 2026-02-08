import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'student' | 'staff' | 'admin';

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Simulate login (in real app, this would call API)
  login(username: string, password: string): boolean {
    // Mock users for demonstration
    const mockUsers: { [key: string]: User } = {
      'student': { id: 1, name: 'Alice Student', role: 'student' },
      'staff': { id: 2, name: 'Bob Staff', role: 'staff' },
      'admin': { id: 3, name: 'Carol Admin', role: 'admin' }
    };

    const user = mockUsers[username];
    if (user && password === 'password') {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Role checking methods
  isStudent(): boolean {
    return this.currentUserSubject.value?.role === 'student';
  }

  isStaff(): boolean {
    return this.currentUserSubject.value?.role === 'staff';
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  // Permission checks based on requirements
  canAddSuggestion(): boolean {
    // Students and staff can add suggestions
    return this.isStudent() || this.isStaff() || this.isAdmin();
  }

  canViewSuggestions(): boolean {
    console.log(this.getCurrentUser());
    
    // Everyone can view
    return this.isLoggedIn();
  }

  canEditSuggestion(): boolean {
    // Only staff and admin can edit (approve/reject)
    return this.isStaff() || this.isAdmin();
  }

  canDeleteSuggestion(): boolean {

    console.log('Checking delete permission for user:', this.getCurrentUser());
    // Only admin can delete
    return this.isAdmin();
  }

  // Quick role switcher for testing (REMOVE IN PRODUCTION!)
  switchRole(role: UserRole): void {
    const user: User = {
      id: Date.now(),
      name: `Test ${role}`,
      role: role
    };
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Quick login for testing (3 buttons)
  quickLogin(role: UserRole): void {
    this.authService.switchRole(role);
    this.router.navigate(['/suggestions']);
  }

  logout(): void {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }
}
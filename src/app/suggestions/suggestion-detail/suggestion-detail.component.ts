import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../models/suggestions';
import { SuggestionsService } from '../services/suggestions.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.css']
})
export class SuggestionDetailComponent implements OnInit {

  suggestion?: Suggestion;
  showDeleteModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadSuggestion(id);
    });
  }

  loadSuggestion(id: number): void {
    this.suggestion = this.suggestionService.getSuggestionById(id);
    if (!this.suggestion) {
      // If suggestion not found, redirect to list
      this.router.navigate(['/suggestions']);
    }
  }

  get canEdit(): boolean {
    return this.authService.canEditSuggestion();
  }

  get canDelete(): boolean {
    return this.authService.canDeleteSuggestion();
  }

  onEdit(): void {
    if (this.suggestion) {
      this.router.navigate(['/suggestions', this.suggestion.id, 'edit']);
    }
  }

  onDeleteClick(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.suggestion) {
      this.suggestionService.deleteSuggestion(this.suggestion.id);
      this.showDeleteModal = false;
      this.router.navigate(['/suggestions']);
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'infrastructure': '🏗️',
      'pédagogie': '📚',
      'cantine': '🍽️',
      'transport': '🚌'
    };
    return icons[category] || '💡';
  }

  getStatusClass(status: string): string {
    return 'status-' + status.toLowerCase().replace(' ', '-');
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../models/suggestions';
import { SuggestionsService } from '../services/suggestions.service';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.css']
})
export class SuggestionsListComponent implements OnInit {
  
  allSuggestions: Suggestion[] = [];
  filteredSuggestions: Suggestion[] = [];
  
  // Filter values
  selectedCategory: string = '';
  selectedStatus: string = '';
  
  // Available options
  categories: string[] = [];
  statuses: string[] = [];
  
  constructor(
    private suggestionService: SuggestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSuggestions();
    this.loadFilterOptions();
  }

  loadSuggestions(): void {
    this.allSuggestions = this.suggestionService.getAllSuggestions();
    this.filteredSuggestions = [...this.allSuggestions];
  }

  loadFilterOptions(): void {
    this.categories = this.suggestionService.getCategories();
    this.statuses = this.suggestionService.getStatuses();
  }

  // Apply filters
  applyFilters(): void {
    this.filteredSuggestions = this.allSuggestions.filter(suggestion => {
      const categoryMatch = !this.selectedCategory || suggestion.category === this.selectedCategory;
      const statusMatch = !this.selectedStatus || suggestion.statut === this.selectedStatus;
      return categoryMatch && statusMatch;
    });
  }

  // Clear all filters
  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  // Computed properties for stats
  get totalSuggestions(): number {
    return this.filteredSuggestions.length;
  }
  
  get pendingSuggestions(): number {
    return this.filteredSuggestions.filter(s => s.statut === 'En attente').length;
  }
  
  get approvedSuggestions(): number {
    return this.filteredSuggestions.filter(s => s.statut === 'Validée').length;
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

  viewDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

  addNew(): void {
    this.router.navigate(['/suggestions/new']);
  }
}
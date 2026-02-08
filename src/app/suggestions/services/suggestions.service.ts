import { Injectable } from '@angular/core';
import { Suggestion } from '../models/suggestions';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Améliorer le WiFi dans le bâtiment A',
      description: 'Le WiFi est très lent et se déconnecte fréquemment dans le bâtiment A. Il serait bien d\'avoir des points d\'accès supplémentaires.',
      category: 'infrastructure',
      date: new Date('2025-01-15'),
      statut: 'En attente'
    },
    {
      id: 2,
      title: 'Plus de choix végétariens à la cantine',
      description: 'Ajouter des options végétariennes variées au menu quotidien.',
      category: 'cantine',
      date: new Date('2025-01-20'),
      statut: 'Validée'
    },
    {
      id: 3,
      title: 'Navette universitaire le weekend',
      description: 'Service de navette disponible le samedi pour faciliter l\'accès au campus.',
      category: 'transport',
      date: new Date('2025-02-01'),
      statut: 'Rejetée'
    },
    {
      id: 4,
      title: 'Cours en ligne pour certaines matières',
      description: 'Offrir la possibilité de suivre certains cours en ligne pour plus de flexibilité.',
      category: 'pédagogie',
      date: new Date('2025-02-05'),
      statut: 'En attente'
    }
  ];

  constructor() { }


  getAllSuggestions(): Suggestion[] {
    return this.suggestions;
  }

  getSuggestionById(id: number): Suggestion | undefined {
    return this.suggestions.find(suggestion => suggestion.id === id);
  }

  addSuggestion(suggestion: Suggestion): void {
    suggestion.id = Math.max(...this.suggestions.map(s => s.id)) + 1; // Générer un nouvel ID

    this.suggestions.push(suggestion);
  }

  updateSuggestion(updatedSuggestion: Suggestion): void {
    const index = this.suggestions.findIndex(suggestion => suggestion.id === updatedSuggestion.id);

    if (index !== -1) {
      this.suggestions[index] = updatedSuggestion;
    }
  }

  deleteSuggestion(id: number): void {
    this.suggestions = this.suggestions.filter(suggestion => suggestion.id !== id);
  }

  filterByCategory(category: string): Suggestion[] {
    if (!category) return this.suggestions;
    return this.suggestions.filter(s => s.category === category);
  }

  filterByStatut(statut: string): Suggestion[] {
    if (!statut) return this.suggestions;
    return this.suggestions.filter(s => s.statut === statut);
  }

  getCategories(): string[] {
    return ['infrastructure', 'pédagogie', 'cantine', 'transport'];
  }

  getStatuses(): string[] {
    return ['En attente', 'Validée', 'Rejetée'];
  }
}

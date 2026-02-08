import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionsService } from '../services/suggestions.service';
import { Suggestion } from '../models/suggestions';


@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  
  suggestionForm!: FormGroup;
  isEditMode = false;
  suggestionId?: number;
  
  categories = ['infrastructure', 'pédagogie', 'cantine', 'transport'];
  
  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Initialize the form
    this.initForm();
    
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.suggestionId = +params['id']; // + converts string to number
        this.loadSuggestion(this.suggestionId);
      }
    });
  }

  initForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required]
    });
  }

  loadSuggestion(id: number): void {
    const suggestion = this.suggestionService.getSuggestionById(id);
    if (suggestion) {
      // Populate form with existing data
      this.suggestionForm.patchValue({
        title: suggestion.title,
        description: suggestion.description,
        category: suggestion.category
      });
    }
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.value;
      
      if (this.isEditMode && this.suggestionId) {
        // Update existing suggestion
        const updatedSuggestion: Suggestion = {
          id: this.suggestionId,
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(), // Keep original or update
          statut: 'En attente' // Keep original statut
        };
        this.suggestionService.updateSuggestion(updatedSuggestion);
      } else {
        // Create new suggestion
        const newSuggestion: Suggestion = {
          id: 0, // Service will assign ID
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          statut: 'En attente'
        };
        this.suggestionService.addSuggestion(newSuggestion);
      }
      
      // Navigate back to list
      this.router.navigate(['/suggestions']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.suggestionForm.controls).forEach(key => {
        this.suggestionForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/suggestions']);
  }

  // Helper methods for validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.suggestionForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.suggestionForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    return '';
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
}
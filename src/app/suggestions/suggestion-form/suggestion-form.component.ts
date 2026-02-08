import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionsService } from '../services/suggestions.service';
import { Suggestion } from '../models/suggestions';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  
  suggestionForm!: FormGroup;
  isEditMode = false;
  suggestionId?: number;
  currentSuggestion?: Suggestion; // to store the suggestion being edited
  
  categories = ['infrastructure', 'pédagogie', 'cantine', 'transport'];
  statuses = ['En attente', 'Validée', 'Rejetée'];
  
  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
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
      category: ['', Validators.required],
      statut: ['En attente']
    });
  }

  loadSuggestion(id: number): void {
    const suggestion = this.suggestionService.getSuggestionById(id);
    if (suggestion) {
      this.currentSuggestion = suggestion; // Store it
      this.suggestionForm.patchValue({
        title: suggestion.title,
        description: suggestion.description,
        category: suggestion.category,
        statut: suggestion.statut // Load existing status
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
          date: this.currentSuggestion?.date || new Date(), // Preserve original date
          statut: formValue.statut // Update status
        };
        this.suggestionService.updateSuggestion(updatedSuggestion);
      } else {
        // Create new suggestion
        const newSuggestion: Suggestion = {
          id: 0,
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          statut: 'En attente' // New suggestions always start as pending
        };
        this.suggestionService.addSuggestion(newSuggestion);
      }
      
      this.router.navigate(['/suggestions']);
    } else {
      Object.keys(this.suggestionForm.controls).forEach(key => {
        this.suggestionForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/suggestions']);
  }

  // Check if user can edit status
  get canEditStatus(): boolean {
    return this.authService.canEditSuggestion() && this.isEditMode;
  }

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

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'En attente': '⏳',
      'Validée': '✅',
      'Rejetée': '❌'
    };
    return icons[status] || '📊';
  }
}
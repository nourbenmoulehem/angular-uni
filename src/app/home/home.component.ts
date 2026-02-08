import { Component } from '@angular/core';
import { Suggestion } from '../suggestions/models/suggestions';
import { SuggestionsService } from '../suggestions/services/suggestions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  name: string = "Nour Ben Moulehem";
  discount: number = 0;
  color: string = "pink";

  suggestions: Suggestion[] = [];

  products: any[] = [
    { id: 1, name: 'Cute bunny', price: 999.99,quantity : 0 ,  img: 'https://i.pinimg.com/736x/59/29/50/592950d6764d355659340e5a7d907ad4.jpg' },
    { id: 2, name: 'Aesthetic Mug', price: 699.99,quantity : 0 , img: 'https://i.pinimg.com/1200x/26/74/6f/26746f3452506a122ec0458939fd2806.jpg' },
    { id: 3, name: 'Accessory holder', price: 499.99,quantity : 0 , img: 'https://i.pinimg.com/736x/0e/c7/c7/0ec7c7e9dbbb4f6de64a57c7e000d042.jpg' }
  ];  

  constructor(private suggestionsService: SuggestionsService) {}

  ngOnInit() {
    this.suggestions = this.suggestionsService.getAllSuggestions();

    console.log("Suggestions loaded:", this.suggestions);
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

  buyProduct(product: any) {
    alert(`You have bought ${product.name} for $${product.price}!`);
  }

  magicButton() {
    this.discount += 5;
  }

  increment(p: any) {
    //product.quantity += 1;

    this.products[p].quantity += 1;
  }

  decrement(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    }
  }

}

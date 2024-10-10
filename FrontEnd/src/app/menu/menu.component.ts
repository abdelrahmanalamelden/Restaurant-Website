import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MCardComponent } from '../mcard/mcard.component';
import { OrderComponent } from '../order/order.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, MCardComponent, OrderComponent, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../styles/btn.css'],
})
export class MenuComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    // Bind the parent method to ensure 'this' refers to the parent
    this.onDel = this.onDel.bind(this);
  }
  buttons = [
    { title: 'All', link: '/' },
    { title: 'Breakfast', link: 'breakfast' },
    { title: 'Main Dishes', link: 'maindishes' },
    { title: 'Drinks', link: 'drinks' },
    { title: 'Desserts', link: 'desserts' },
  ];

  private http = inject(HttpClient);
  http1 = inject(HttpClient);

  products: any[] = [];

  fetchProducts(category?: string) {
    if (category !== '/') {
      category = '?category=' + category;
    }
    this.http
      .get<any[]>('http://localhost:8000/products' + category)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  queryProducts(category?: string) {
    console.log('Querying products:', category);
    this.fetchProducts(category);
  }

  onDel(id: string) {
    console.log('Delete ID:', id);
    console.log(this.http);
    axios.delete(`http://localhost:8000/products/${id}`).then(() => {
      this.products = this.products.filter((product) => product._id !== id);
      //this.fetchProducts();
    });
  }

  onEdit(id: any) {
    console.log('Edit ID:', id);
    // Handle edit logic here
  }

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category') || '';
    console.log('Category:', category);
    this.fetchProducts(category);
  }
}

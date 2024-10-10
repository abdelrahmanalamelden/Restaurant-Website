import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
  standalone: true, // Mark as standalone
  imports: [ReactiveFormsModule, NgIf], // Import ReactiveFormsModule directly
})
export class AdminAddProductComponent {
  private apiUrl = 'http://localhost:8000/products'; // Update the URL as necessary

  productForm: FormGroup;
  categories = ['Breakfast', 'Main Dishes', 'Drinks', 'Desserts'];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize form
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required]],
      description: [''],
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.productForm.invalid || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('productName', this.productForm.get('name')?.value);
    formData.append('productPrice', this.productForm.get('price')?.value);
    formData.append('productCategory', this.productForm.get('category')?.value);
    formData.append(
      'productSupplier',
      this.productForm.get('description')?.value
    );
    formData.append('productImage', this.selectedFile, this.selectedFile.name);

    // Implement your POST request logic here products
    console.log('Form data:', formData);
    this.http.post<any>(this.apiUrl, formData).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }
}

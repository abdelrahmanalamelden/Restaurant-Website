import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [FormsModule, NgIf],
  standalone: true,
})
export class EditComponent implements OnInit {
  id!: string;
  price!: number;
  category!: string;
  description!: string;
  imageFile: File | null = null; // To store the uploaded image
  src!: string; // Image preview URL

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the query parameters
    this.id = this.route.snapshot.paramMap.get('id') || '';

    console.log('Product ID:', this.id);
    if (this.id) {
      // Fetch the product data from API
      this.fetchProductData();
    }
  }

  // Fetch the product data using the id
  fetchProductData() {
    this.http
      .get<any>(`http://localhost:8000/products/${this.id}`)
      .subscribe((product) => {
        this.price = product.productPrice;
        this.category = product.productCategory;
        this.description = product.productSupplier;
        this.src = product.productImage[0]; // Assuming 'imageUrl' is returned by the API
        console.log('Product data:', product);
      });
  }

  // Handle image file selection
  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];

    // Show image preview
    if (this.imageFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.src = e.target.result; // Set preview URL
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  // Function to handle form submission
  onSubmit() {
    const formData = new FormData();

    formData.append('productPrice', this.price.toString());
    formData.append('productCategory', this.category);
    formData.append('productSupplier', this.description);

    // Append image only if the user uploaded a new one
    if (this.imageFile) {
      formData.append('productImage', this.imageFile, this.imageFile.name);
      console.log('Image uploaded:', this.imageFile);
    }

    // Send a PUT request to update the card, including the image
    this.http
      .patch(`http://localhost:8000/products/${this.id}`, formData)
      .subscribe(
        (response) => {
          console.log('Product updated:', response);
          // Redirect or handle success
          this.router.navigate(['/Menu']); // Redirect after success
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
  }
}

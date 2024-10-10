import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  standalone: true,
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  data: any;
  http = inject(HttpClient);

  submitBook(e: Event) {
    e.preventDefault(); // Prevent the default form submission

    // Capture the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const formObj: any = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });

    // Send the plain object data as JSON to the API
    this.http.post('http://localhost:8000/book', formObj).subscribe({
      next: (res) => {
        console.log('Form submitted successfully', res);
      },
      error: (err) => {
        console.error('Error submitting form', err);
      },
    });

    // Debugging: Log the form object
    console.log(formObj);
  }
}

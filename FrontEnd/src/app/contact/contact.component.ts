import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  data: any;
  http = inject(HttpClient);

  sendMail(e: any) {
    e.preventDefault();
    this.data = new FormData(e.target);
    console.log(this.data.get('name'));
  }
}

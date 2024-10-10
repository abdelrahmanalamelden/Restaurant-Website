import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  testimonials = [
    {
      title: 'The best restaurant',
      description:
        'Last night, we dined at this place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.',
      name: 'Sophire Robson',
      location: 'Los Angeles, CA',
      image: './customers/Ellipse 19.png', // Replace with actual image path
    },
    {
      title: 'Simply delicious',
      description:
        'This place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.',
      name: 'Matt Cannon',
      location: 'San Diego, CA',
      image: './customers/Image.png', // Replace with actual image path
    },
    {
      title: 'One of a kind restaurant',
      description:
        'The culinary experience at this place is first to none. The atmosphere is vibrant, the food – nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.',
      name: 'Andy Smith',
      location: 'San Francisco, CA',
      image: './customers/Image (1).png', // Replace with actual image path
    },
  ];
}

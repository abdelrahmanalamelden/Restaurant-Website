import { Component } from '@angular/core';
import { cardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [cardComponent, NgFor],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent {
  cards = [
    {
      link: '/menu/breakfast',
      imgSrc: './Browse/icon.png',
      title: 'Breakfast',
      description:
        'In the new era of technology we look in the future with certainty and pride for our life.',
    },
    {
      link: '/menu/maindishes',
      imgSrc: './Browse/icon (1).png',
      title: 'Main Dish',
      description:
        'In the new era of technology we look in the future with certainty and pride for our life.',
    },
    {
      link: '/menu/drinks',
      imgSrc: './Browse/icon (2).png',
      title: 'Drinks',
      description:
        'In the new era of technology we look in the future with certainty and pride for our life.',
    },
    {
      link: '/menu/desserts',
      imgSrc: './Browse/icon (3).png',
      title: 'Dessert',
      description:
        'In the new era of technology we look in the future with certainty and pride for our life.',
    },
  ];
}

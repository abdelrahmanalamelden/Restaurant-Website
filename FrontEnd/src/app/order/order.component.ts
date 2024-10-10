import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  apps = [
    {
      src: './apps/Group 39979.png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/Group 39981.png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/Group.png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/uber.png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/Vector (1).png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/Vector (2).png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/Vector (3).png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/Vector (4).png',
      size: '1.5rem',
      link: '',
    },
    {
      src: './apps/Vector.png',
      size: '1.5rem',
      link: '',
    },
  ];
}

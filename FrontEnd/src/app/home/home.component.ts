import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { BrowseComponent } from '../browse/browse.component';
import { AboutComponent } from '../about/about.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainComponent,
    BrowseComponent,
    AboutComponent,
    AboutusComponent,
    TestimonialsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class cardComponent {
  @Input() category?: string;
  @Input() src?: string;
  @Input() description?: string;
  @Input() ref?: string;
}

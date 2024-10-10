import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../styles/btn.css'],
})
export class AboutComponent {
  mail = 'i.muhammadayman@gmail.com';
  phone = '(+20)100-157-9573';
}

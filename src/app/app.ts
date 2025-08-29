import { Component, signal } from '@angular/core';
import { Navbar } from './pages/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  readonly title = signal('Metamask');
}



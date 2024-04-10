import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoffeeCupsListComponent } from './coffee-cups-list/coffee-cups-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoffeeCupsListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CoffeeTracker';
}

import { Component } from '@angular/core';
import { Flight } from './flight.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  filteredFlights: Flight[] = [];

  onFilter(filteredFlights: Flight[]) {
    this.filteredFlights = filteredFlights;
  }
}

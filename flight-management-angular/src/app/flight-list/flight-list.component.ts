import { Component, Input, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss',
})
export class FlightListComponent implements OnInit {
  constructor(private flightService: FlightService) {}

  @Input() filteredFlights: Flight[] = [];

  flights$: Observable<Flight[]> = new Observable<Flight[]>();

  headers: string[] = [
    'flightNumber',
    'landingAirport',
    'takeoffAirport',
    'status',
    'takeoffTime',
    'landingTime',
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.loadFlights();
    }, 1000);
  }

  loadFlights() {
    if (this.filteredFlights.length > 0) {
      this.flights$ = new Observable<Flight[]>((observer) => {
        observer.next(this.filteredFlights);
        observer.complete();
      });
    } else {
      this.flights$ = this.flightService.getInitialFlights();
    }
  }
}

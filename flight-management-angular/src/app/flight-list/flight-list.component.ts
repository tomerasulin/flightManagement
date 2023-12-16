import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
    this.loadFlights();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filteredFlights'] && !changes['filteredFlights'].firstChange) {
      this.loadFlights();
    }
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

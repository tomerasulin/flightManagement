import { Component, Input, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss',
})
export class FlightListComponent implements OnInit {
  constructor(private flightService: FlightService) {}

  @Input() filteredFlight: Flight[] = [];

  flights: Flight[] = [];

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

    interval(1500).subscribe(() => {
      this.loadFlights();
    });
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe((res) => {
      if (this.filteredFlight.length > 0) {
        this.flights = this.filteredFlight;
      } else {
        this.flights = res;
      }
    });
  }
}

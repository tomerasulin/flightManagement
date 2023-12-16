import { Component, Input, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss',
})
export class FlightListComponent implements OnInit {
  constructor(private flightService: FlightService) {}

  @Input() filteredFlight: Flight[] = [];

  flights$: Observable<Flight[]> = new Observable<Flight[]>();

  headers: string[] = [
    'flightNumber',
    'takeoffAirport',
    'landingAirport',
    'status',
    'takeoffTime',
    'landingTime',
  ];

  ngOnInit(): void {
    this.flights$ = this.flightService.getInitialFlights();
  }
}

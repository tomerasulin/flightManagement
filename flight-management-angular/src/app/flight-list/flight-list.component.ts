import { Component, OnInit } from '@angular/core';
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

  flights: Flight[] = [];

  headers: string[] = [
    'flightNumber',
    'takeoffAirport',
    'landingAirport',
    'status',
    'takeoffTime',
    'landingTime',
  ];

  ngOnInit(): void {
    this.flightService.flights.subscribe((res) => {
      this.flights = res;
    });
    this.flightService.getSocketFlights();

  }
}

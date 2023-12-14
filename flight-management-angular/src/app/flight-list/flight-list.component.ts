import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss',
})
export class FlightListComponent implements OnInit {
  constructor(private flightService: FlightService) {}

  flights = this.flightService.getFlights();

  headers: string[] = [
    'flightNumber',
    'landingAirport',
    'takeoffAirport',
    'status',
    'takeoffTime',
    'landingTime',
  ];

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(500)),
    ]),
  ],
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

  timeDelay: number = 0;
  flightID: string = '';

  ngOnInit(): void {
    this.flightService.flights.subscribe((flights) => {
      this.flights = flights;
    });

    this.flightService.timeDelay.subscribe((delay) => {
      this.timeDelay = delay;
    });

    this.flightService.flightID.subscribe((id) => {
      this.flightID = id;
    });

    this.flightService.getSocketFlights();
  }
}

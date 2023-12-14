import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss',
})
export class FlightFormComponent implements OnInit {
  constructor() {}

  flight = {
    flightNumber: '',
    landingAirport: '',
    takeoffAirport: '',
    status: 'hangar',
    takeoffTime: '',
    landingTime: '',
  };

  ngOnInit(): void {}

  onSubmit(flightForm: NgForm) {}
}

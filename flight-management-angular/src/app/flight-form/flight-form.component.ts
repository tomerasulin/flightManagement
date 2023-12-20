import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss',
})
export class FlightFormComponent implements OnInit {
  constructor(
    private flightService: FlightService,
    public dialogRef: MatDialogRef<FlightFormComponent>
  ) {}

  flights: Flight[] = [];

  flight = {
    flightNumber: '',
    landingAirport: '',
    takeoffAirport: '',
    status: 'hangar',
    takeoffTime: '',
    landingTime: '',
  };

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((flights) => {
      this.flights = flights;
    });
  }

  onSubmit(flightForm: NgForm) {
    const flightData: Flight = flightForm.value as Flight;
    const targetFlight = this.flights.find(flight => flight.flightNumber === flightData.flightNumber);

    if (targetFlight) {
      this.flightService.updateFlight(targetFlight._id, flightData);
    } else {
      this.flightService.createFlight(flightData);
    }

    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

export function landingTimeValidator(
  takeoffTimeControl: AbstractControl
): ValidatorFn {
  return (landingTimeControl: AbstractControl): ValidationErrors | null => {
    const takeoffTime = new Date(takeoffTimeControl.value);
    const landingTime = new Date(landingTimeControl.value);

    if (landingTime <= takeoffTime) {
      return { invalidLandingTime: true };
    }

    return null;
  };
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  flight = {
    flightNumber: '',
    landingAirport: '',
    takeoffAirport: '',
    status: 'hangar',
    takeoffTime: '',
    landingTime: '',
  };

  ngOnInit(): void {}

  onSubmit(flightForm: NgForm) {
    let flightNumber = flightForm.form.value.flightNumber;
    let landingAirport = flightForm.form.value.landingAirport;
    let takeoffAirport = flightForm.form.value.takeoffAirport;
    let status = flightForm.form.value.status;
    let takeoffTime = flightForm.form.value.takeoffTime;
    let landingTime = flightForm.form.value.landingTime;

    console.log(
      flightNumber,
      landingAirport,
      takeoffAirport,
      status,
      takeoffTime,
      landingTime
    );

    this.flightService
      .createFlight({
        flightNumber,
        landingAirport,
        takeoffAirport,
        status,
        takeoffTime,
        landingTime,
      } as Flight)
      .subscribe(() => {
        console.log('Accepted');
      });

    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

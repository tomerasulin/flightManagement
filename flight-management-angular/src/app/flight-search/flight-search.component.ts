import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
})
export class FlightSearchComponent implements OnInit {
  constructor(private flightService: FlightService) {}

  ngOnInit(): void {}

  @Output() filteredFlights = new EventEmitter<Flight[]>();

  onInput(term: string): void {
    this.flightService.searchFlights(term);
  }
}

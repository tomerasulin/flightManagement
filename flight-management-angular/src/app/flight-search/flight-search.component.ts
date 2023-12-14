import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
})
export class FlightSearchComponent implements OnInit {
  constructor(private flightService: FlightService) {}

  @Output() submitted = new EventEmitter<string>();

  term: string = '';

  ngOnInit(): void {}

  onSubmit(event: any) {
    event.preventDefault();
    this.submitted.emit(this.term);
  }
}

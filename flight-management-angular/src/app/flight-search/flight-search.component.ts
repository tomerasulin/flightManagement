import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
})
export class FlightSearchComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {}

  onInput(term: string) {
    this.flightService
      .searchFlights(term)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$) // Cancel the previous request when a new one is made
      )
      .subscribe((res) => {
        this.flightService.filteredFlights = res;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Flight } from './flight.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { FLIGHTS } from './mock-flights';

const API_BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  flights = new BehaviorSubject<Flight[]>(FLIGHTS);
  filteredFlights: Flight[] = [];

  constructor(private socket: Socket, private http: HttpClient) {}

  getSocketFlights() {
    this.socket.fromEvent<Flight[]>('flights').subscribe((flights) => {
      this.flights.next(flights);
      if (this.filteredFlights.length > 0) {
        this.flights.next(this.filteredFlights);
      }
    });
  }

  getFlights(): Observable<Flight[]> {
    return this.http
      .get<Flight[]>(`${API_BASE_URL}/flights`)
      .pipe(catchError(this.handleError));
  }

  createFlight(flightData: Flight): void {
    this.socket.emit('createFlight', flightData);
  }

  updateFlight(flightNumber: string, flightData: Flight): void {
    this.socket.emit('updateFlight', {
      flightNumber,
      flightData,
    });
  }

  getFlight(flightNumber: string): Observable<Flight> {
    return this.http
      .get<Flight>(`${API_BASE_URL}/flights/${flightNumber}`)
      .pipe(catchError(this.handleError));
  }

  searchFlights(term: string): Observable<Flight[]> {
    return this.http
      .get<Flight[]>(`${API_BASE_URL}/flights/filter?term=${term}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './flight.model';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${API_BASE_URL}/flights`);
  }

  createFlight(flightData: Flight): Observable<Flight> {
    return this.http.post<Flight>(`${API_BASE_URL}/flights`, flightData);
  }

  updateFlight(flightNumber: string, flightData: Flight): Observable<Flight> {
    return this.http.put<Flight>(
      `${API_BASE_URL}/flights/${flightNumber}`,
      flightData
    );
  }

  getFlight(flightNumber: string): Observable<Flight> {
    return this.http.get<Flight>(`${API_BASE_URL}/flights/${flightNumber}`);
  }

  searchFlights(term: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(
      `${API_BASE_URL}/flights/filter?term=${term}`
    );
  }
}

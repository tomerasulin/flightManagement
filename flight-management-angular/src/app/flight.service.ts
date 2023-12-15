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

  getFlights(): Observable<any> {
    return this.http.get(`${API_BASE_URL}/flights`);
  }

  createFlight(flightData: any) {
    console.log('Inside flight service');
    console.log(flightData);
    return this.http.post<Flight>(`${API_BASE_URL}/flights`, flightData);
  }
}

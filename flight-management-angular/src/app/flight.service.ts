import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './flight.model';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

const API_BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private socket: Socket, private http: HttpClient) {
    this.socket.on('flights', (res: any) => {});
  }

  getInitialFlights(): Observable<Flight[]> {
    return this.socket.fromEvent<Flight[]>('flights');
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${API_BASE_URL}/flights`);
  }

  createFlight(flightData: Flight) {
    this.socket.emit('createFlight', flightData);
  }

  updateFlight(flightNumber: string, flightData: Flight) {
    this.socket.emit('updateFlight', {
      flightNumber: flightNumber,
      flightData: flightData,
    });
  }

  getFlight(flightNumber: string): Observable<Flight> {
    return this.http.get<Flight>(`${API_BASE_URL}/flights/${flightNumber}`);
  }

  searchFlights(term: string): void {
    this.http.get<Flight[]>(`${API_BASE_URL}/flights/filter?term=${term}`);
  }
}

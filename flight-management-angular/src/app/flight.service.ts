import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);

  constructor() { }

  getFlights(): Observable<Flight[]>{
    return this.flights.asObservable();
  }

  updateFlight(): void{

  }
}

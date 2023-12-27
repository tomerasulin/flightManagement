import { Flight } from './flight.model';

export const FLIGHTS: Flight[] = [
  {
    _id: '1',
    flightNumber: 'EL214',
    takeoffAirport: 'BKK',
    landingAirport: 'HKT',
    takeoffTime: new Date(),
    landingTime: new Date(),
    status: 'hangar',
  },
  {
    _id: '2',
    flightNumber: 'PG829',
    takeoffAirport: 'MIL',
    landingAirport: 'OKL',
    takeoffTime: new Date(),
    landingTime: new Date(),
    status: 'airborne',
  },
  {
    _id: '3',
    flightNumber: 'DJ471',
    takeoffAirport: 'BOS',
    landingAirport: 'PRS',
    takeoffTime: new Date(),
    landingTime: new Date(),
    status: 'hangar',
  },
  {
    _id: '4',
    flightNumber: 'JH2581',
    takeoffAirport: 'WRH',
    landingAirport: 'OHO',
    takeoffTime: new Date(),
    landingTime: new Date(),
    status: 'airborne',
  },
  {
    _id: '5',
    flightNumber: 'PG325',
    takeoffAirport: 'CHI',
    landingAirport: 'JPN',
    takeoffTime: new Date(),
    landingTime: new Date(),
    status: 'malfunction',
  },
];

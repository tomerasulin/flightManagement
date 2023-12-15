export interface Flight {
  _id: string;
  flightNumber: string;
  takeoffAirport: string;
  landingAirport: string;
  takeoffTime: Date;
  landingTime: Date;
  status: string;
}

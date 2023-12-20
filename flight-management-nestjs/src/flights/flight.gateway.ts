import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FlightsService } from './flights.service';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: ['http://localhost:4200', 'http://13.48.27.215:4200', 'http://flightmanagement.ta.s3-website.eu-north-1.amazonaws.com'] },
})
export class FlightGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => FlightsService))
    private flightsService: FlightsService,
  ) {} // resolve the circular DI

  async handleConnection(client: Socket) {
    console.log('Connected client: ', client.id);
    const res = await this.flightsService.findAll();
    client.emit('flights', res);
    this.flightsService.startPeriodUpate();
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnected client: ', client.id);
  }

  @SubscribeMessage('createFlight')
  async handleCreateFlight(client: Socket, payload: any) {
    this.flightsService.create(payload);
    const res = await this.flightsService.findAll();
    client.emit('flights', res);
  }

  @SubscribeMessage('updateFlight')
  async handleUpdateFlight(client: Socket, payload: any) {
    this.flightsService.update(payload.flightNumber, payload.flightData);
    const res = await this.flightsService.findAll();
    client.emit('flights', res);
  }
}

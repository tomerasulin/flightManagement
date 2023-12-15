import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from './flight.schema';
import { Server } from 'socket.io';

@Injectable()
export class FlightsService {
  private server: Server;

  constructor(
    @InjectModel(Flight.name) private flightsModel: Model<FlightDocument>,
  ) {}

  setServer(server: Server): void {
    this.server = server;
  }

  async create(createFlightDto: Flight): Promise<Flight> {
    const createdFlight = new this.flightsModel(createFlightDto);
    const res = await createdFlight.save();
    this.emitUpdate();
    return res;
  }

  async findAll(): Promise<Flight[]> {
    const res = await this.flightsModel.find().exec();
    this.emitUpdate();
    return res;
  }

  async findOne(id: string): Promise<Flight> {
    const res = this.flightsModel.findById(id).exec();
    this.emitUpdate();
    return res;
  }

  async update(id: string, updateFlightDto: Flight): Promise<Flight> {
    const res = this.flightsModel
      .findByIdAndUpdate(id, updateFlightDto, { new: true })
      .exec();
    this.emitUpdate();
    return res;
  }

  //   async remove(id: string): Promise<Flight> {
  //     const deletedFlight = await this.flightModel.findByIdAndDelete(id).exec();
  //     return deletedFlight ? (deletedFlight.toObject() as Flight) : null;
  //   }

  async findByFilter(filter: any): Promise<Flight[]> {
    const res = this.flightsModel.find(filter).exec();
    this.emitUpdate();
    return res;
  }

  private emitUpdate(): void {
    if (this.server) {
      this.server.emit('update', 'Flight data updated');
    }
  }
}

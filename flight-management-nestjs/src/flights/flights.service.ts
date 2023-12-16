import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from './flight.schema';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name) private flightsModel: Model<FlightDocument>,
  ) {}

  async create(createFlightDto: Flight): Promise<Flight> {
    const createdFlight = new this.flightsModel(createFlightDto);
    const res = await createdFlight.save();
    return res;
  }

  async findAll() {
    const res = await this.flightsModel.find().exec();
    return res;
  }

  async findOne(id: string): Promise<Flight> {
    const res = this.flightsModel.findById(id).exec();
    return res;
  }

  async update(id: string, updateFlightDto: Flight): Promise<Flight> {
    const res = this.flightsModel
      .findByIdAndUpdate(id, updateFlightDto, { new: true })
      .exec();
    return res;
  }

  async remove(id: string): Promise<any> {
    const deletedFlight = this.flightsModel.findByIdAndDelete(id).exec();
    return deletedFlight;
  }

  async findByFilter(filter: string): Promise<Flight[]> {
    const res = this.flightsModel
      .find({
        $or: [
          { flightNumber: { $regex: filter, $options: 'i' } }, // Case-insensitive regex match
          { takeoffAirport: { $regex: filter, $options: 'i' } },
          { takeoffTime: { $regex: filter, $options: 'i' } },
          { landingAirport: { $regex: filter, $options: 'i' } },
          { landingTime: { $regex: filter, $options: 'i' } },
        ],
      })
      .exec();
    return res;
  }
}

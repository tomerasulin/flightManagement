import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from './flight.schema';
import { FlightGateway } from './flight.gateway';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name) private flightsModel: Model<FlightDocument>,
    private readonly gateway: FlightGateway,
  ) {}

  async startPeriodUpate() {
    setInterval(async () => {
      this.randomUpdates();
      const res = await this.findAll();
      this.gateway.server.emit('flights', res);
    }, 1500);
  }

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

  async randomUpdates() {
    const flights = await this.flightsModel.find().exec();
    const randomFlight = flights[Math.floor(Math.random() * flights.length)];
    const randomUpdate: number = Math.floor(Math.random() * 3) + 1;

    switch (randomUpdate) {
      //status
      case 1:
        this.updateStatus(randomFlight);
        break;
      // time delay
      case 2:
        this.updateTime(randomFlight);
        break;
      case 3:
        this.updateLandingAirport(randomFlight);
        break;
      default:
        break;
    }
  }

  private async updateStatus(flight: Flight) {
    const statusOptions = ['hangar', 'airborne', 'malfunction'];
    const randomStatus =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    await this.flightsModel
      .findByIdAndUpdate(
        flight._id,
        { $set: { status: randomStatus } },
        { new: true },
      )
      .exec();
  }

  private async updateTime(flight: Flight) {
    const maxDelayMinutes = 120;
    const randomDelay = Math.floor(Math.random() * (maxDelayMinutes + 1));

    const timeTakeoffDelay = new Date(flight.takeoffTime);
    const timeAsNumberTakeoff =
      timeTakeoffDelay.getHours() * 100 +
      timeTakeoffDelay.getMinutes() +
      randomDelay;

    timeTakeoffDelay.setHours(
      Math.floor(timeAsNumberTakeoff / 100),
      timeAsNumberTakeoff % 100,
    );

    const timelandingDelay = new Date(flight.landingTime);
    const timeAsNumberLanding =
      timelandingDelay.getHours() * 100 +
      timelandingDelay.getMinutes() +
      randomDelay;

    timelandingDelay.setHours(
      Math.floor(timeAsNumberLanding / 100),
      timeAsNumberLanding % 100,
    );

    await this.flightsModel
      .findByIdAndUpdate(
        flight._id,
        {
          $set: {
            takeoffTime: timeTakeoffDelay.toISOString().slice(0, 16),
            landingTime: timelandingDelay.toISOString().slice(0, 16),
          },
        },

        { new: true },
      )
      .exec();
  }

  private async updateLandingAirport(flight: Flight) {
    const airports = [
      'JFK',
      'LHR',
      'CDG',
      'DXB',
      'SYD',
      'ICN',
      'SIN',
      'PEK',
      'MUC',
      'YYZ',
    ];

    const randomAirport = airports[Math.floor(Math.random() * airports.length)];

    await this.flightsModel
      .findByIdAndUpdate(
        flight._id,
        {
          $set: {
            landingAirport: randomAirport,
          },
        },

        { new: true },
      )
      .exec();
  }
}

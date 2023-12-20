import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './flight.schema';
import { FlightGateway } from './flight.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  providers: [FlightsService, FlightGateway],
  controllers: [FlightsController],
  exports: [FlightsService],
})
export class FlightsModule {}

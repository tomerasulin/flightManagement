import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightsController } from './flights/flights.controller';
import { FlightsService } from './flights/flights.service';

@Module({
  imports: [
    FlightsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/flightsdb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

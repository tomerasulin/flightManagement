import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FlightsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/flightsdb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

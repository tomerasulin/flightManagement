import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  @Prop({ required: true, unique: true })
  flightNumber: string;

  @Prop({ required: true })
  landingAirport: string;

  @Prop({ required: true })
  takeoffAirport: string;

  @Prop({ required: true, enum: ['hangar', 'airborne', 'malfunction'] })
  status: 'hangar' | 'airborne' | 'malfunction';

  @Prop({ required: true })
  landingTime: string;

  @Prop({ required: true })
  takeoffTime: string;

  _id: Types.ObjectId;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);

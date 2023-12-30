import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FlightsModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
        dbName: process.env.MONGO_DB,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
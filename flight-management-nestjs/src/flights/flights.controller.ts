import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flight } from './flight.schema';

@Controller('flights')
export class FlightsController {
  constructor(private flightService: FlightsService) {}

  @Post()
  async create(@Body() createFlightDto: Flight) {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get('filter')
  async findByFilter(@Query('term') filter: string): Promise<Flight[]> {
    return this.flightService.findByFilter(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFlightDto: any) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }
}

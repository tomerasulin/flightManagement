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

@Controller('flights')
export class FlightsController {
  constructor(private flightService: FlightsService) {}

  @Post()
  async create(@Body() createFlightDto: any) {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  async findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFlightDto: any) {
    return this.flightService.update(id, updateFlightDto);
  }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.flightService.remove(id);
  //   }

  @Get('filter')
  async findByFilter(@Query() filter: any) {
    return this.flightService.findByFilter(filter);
  }
}

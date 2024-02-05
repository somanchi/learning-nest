import { Controller } from '@nestjs/common';
import { DefaultValuePipe } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { Context } from '../entities/context';

import { Param } from '@nestjs/common';
import { CarService } from '../services/car.service';
import { Logger } from '@nestjs/common';
@Controller('/v1/')
export class CarQueryController {
  readonly logger: Logger = new Logger(this.constructor.name);

  @Get('cars')
  @ApiQuery({ name: 'filters', required: false })
  @ApiQuery({ name: 'sortFields', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async select(
    @Query('filters', new DefaultValuePipe('')) filters: string,
    @Query('sortFields', new DefaultValuePipe('')) sortFields: string,
    @Query('limit', new DefaultValuePipe(100)) limit: number,
    @Query('offset', new DefaultValuePipe(0)) offset: number,
    context: Context,
  ) {
    this.logger.log(
      `Received a selectAll request for Car with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset}`,
    );
    const response = await this.carService.findAll(
      filters,
      sortFields,
      limit,
      offset,
    );
    this.logger.log(
      `SelectAll request for Car with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset} is complete `,
    );
    return response;
  }

  @Get('cars/:carId')
  async get(@Param('carId') carId: string, context: Context) {
    this.logger.log(`Received a get request for Car: ${carId}`);
    const existingCar = await this.carService.get(carId, context);
    this.logger.log(`Get request for Car ${carId} is complete `);
    return existingCar;
  }

  constructor(private carService: CarService) {}
}

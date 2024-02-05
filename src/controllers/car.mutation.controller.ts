import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { v4 } from 'uuid';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateCarInput } from '../inputs/car.input';
import { Context } from '../entities/context';
import { Res } from '@nestjs/common';

import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateCarInput } from '../inputs/car.update';
import { Delete } from '@nestjs/common';
import { CarService } from '../services/car.service';
import { Logger } from '@nestjs/common';
@Controller('/v1/')
export class CarController {
  readonly logger: Logger = new Logger(this.constructor.name);

  @Post('cars')
  async create(
    @Body() createCarInput: CreateCarInput,
    context: Context,
    @Res() response: Response,
  ) {
    this.logger.log(`Received a new create request `);
    const carId = v4();
    const created = await this.carService.create(
      carId,
      createCarInput,
      context,
    );
    response.setHeader('Location', '/v1/cars/' + carId);
    response.json(created);
    this.logger.log(`Create request for Car ${carId} is complete`);
    return response;
  }

  @Put('cars/:carId')
  async update(
    @Param('carId') carId: string,
    @Body() updateCarInput: UpdateCarInput,
    context: Context,
    @Res() response: Response,
  ) {
    this.logger.log(`Received a update request for : ${carId}`);
    const updtedCar = await this.carService.update(
      carId,
      updateCarInput,
      context,
    );
    response.setHeader('Location', '/v1/cars/' + carId);
    response.json(updtedCar);
    this.logger.log(`Update request for  is complete: ${carId}`);
    return response;
  }

  @Delete('cars/:carId')
  async delete(@Param('carId') carId: string, context: Context) {
    this.logger.log(`Received a delete request for : ${carId} `);
    await this.carService.delete(carId, context);
    this.logger.log(`Delete request completed for  ${carId} is complete `);
  }

  constructor(private carService: CarService) {}
}

import { UpdateCarInput } from '../inputs/car.update';
import { Context } from '../entities/context';
import { Car } from '../models/car';

import { CreateCarInput } from '../inputs/car.input';

export const updateCarFromInput = (
  id: string,
  input: UpdateCarInput,
  context: Context,
  existingModel: Car,
) => {
  existingModel.carId = id;
  existingModel.name = input.name;
  existingModel.owner = input.owner;
  existingModel.vehicleType = input.vehicleType;
  existingModel.awards = input.awards;
  return existingModel;
};

export const createCarFromInput = (
  id: string,
  input: CreateCarInput,
  context: Context,
) => {
  const model = new Car();
  model.carId = id;
  model.name = input.name;
  model.owner = input.owner;
  model.vehicleType = input.vehicleType;
  model.awards = input.awards;
  return model;
};

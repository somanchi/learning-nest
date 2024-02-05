import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filterParser } from 'src/find.all.utils/filterParser';
import { sortParser } from 'src/find.all.utils/sortParser';

import { Car } from '../models/car';
import { CrudRepository } from './crud.repository.interface';
import { PagingAndSortingRepository } from './paging.sorting.repository.interface';
import { RepositoryUtils } from './repository.utils';
@Injectable()
export class CarRepository
  implements CrudRepository<Car, string>, PagingAndSortingRepository<Car>
{
  constructor(
    @InjectModel(Car.name) public model: Model<Car>,
    public repositoryUtils: RepositoryUtils,
  ) {}
  async findAll(
    filters: string,
    sort: string,
    limit: number,
    offset: number,
  ): Promise<Car[]> {
    const filterConditions = this.repositoryUtils.filterConditionProcessor(
      filters,
      Car.name,
    );

    const orderByConditions = this.repositoryUtils.orderByConditionProcessor(
      sort,
      Car.name,
    );

    const response = await this.model
      .find(filterConditions)
      .limit(limit)
      .skip(offset)
      .sort(orderByConditions)
      .exec();
    return response;
  }

  async save(entity: Car): Promise<Car> {
    entity._id = entity.carId;
    const modifiedModel = new this.model(entity);
    return modifiedModel.save();
  }

  async findById(id: string): Promise<Car | undefined> {
    const existingModel = await this.model.findById(id);
    return existingModel;
  }

  async deleteById(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

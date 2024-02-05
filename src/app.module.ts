import { Module } from '@nestjs/common';
import { LoggerAdapter } from './logger/logger.adapter';
import { CarController } from './controllers/car.mutation.controller';
import { CarQueryController } from './controllers/car.query.controller';
import { CarRepository } from './repositories/car.repository';
import { CarService } from './services/car.service';
import { HealthController } from './controllers/health.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Car } from './models/car';
import { CarSchema } from './models/Car';
import { MongoConfig } from './configurations/mongo.config';
import appconfiguration from './configurations/app.configuration';
import { RepositoryUtils } from './repositories/repository.utils';
@Module({
  controllers: [CarController, CarQueryController, HealthController],
  providers: [LoggerAdapter, CarService, CarRepository, RepositoryUtils],
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MongoConfig,
    }),
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appconfiguration],
    }),
  ],
  exports: [LoggerAdapter],
})
export class AppModule {}

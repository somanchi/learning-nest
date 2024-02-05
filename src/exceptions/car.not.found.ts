import { HttpStatus } from '@nestjs/common';

import { NodetestCustomException } from './nodetest.custom.exception';

export class CarNotFound extends NodetestCustomException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

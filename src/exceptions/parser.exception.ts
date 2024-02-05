import { HttpStatus } from '@nestjs/common';
import { NodetestCustomException } from './nodetest.custom.exception';

export class ParserException extends NodetestCustomException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

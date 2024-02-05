import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class Award {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  year: string;
}

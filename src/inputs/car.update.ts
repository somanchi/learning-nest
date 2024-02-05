import { ApiProperty } from '@nestjs/swagger';
import { Owner } from '../models/owner';
import { Award } from '../models/award';

export class UpdateCarInput {
  @ApiProperty()
  carId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  owner: Owner;

  @ApiProperty()
  vehicleType: string;

  @ApiProperty()
  awards: Array<Award>;
}

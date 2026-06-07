import { ApiProperty } from '@nestjs/swagger';

export class PointsResponseDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 340 })
  totalPoints: number;

  @ApiProperty({ example: 90 })
  pointsThisMonth: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class UserStatsDto {
  @ApiProperty({ example: 1 })
  userId!: number;

  @ApiProperty({ example: 28 })
  totalRecycledItems!: number;

  @ApiProperty({ example: 340 })
  totalPoints!: number;

  @ApiProperty({ example: 4 })
  currentLevel!: number;

  @ApiProperty({ example: 5 })
  rewardsEarned!: number;

  @ApiProperty({ example: 'Plástico' })
  mostRecycledCategory!: string;

  @ApiProperty({ example: '2026-06-05T18:30:00Z' })
  lastRecyclingDate!: Date | null;
}

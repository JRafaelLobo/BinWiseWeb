import { ApiProperty } from '@nestjs/swagger';

export class LevelResponseDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 4 })
  currentLevel: number;

  @ApiProperty({ example: 'Eco Aprendiz' })
  currentLevelName: string;

  @ApiProperty({ example: 340 })
  totalPoints: number;

  @ApiProperty({ example: 160 })
  pointsToNextLevel: number;

  @ApiProperty({ example: 68 })
  progressPercentage: number;
}

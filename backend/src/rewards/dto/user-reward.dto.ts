import { ApiProperty } from '@nestjs/swagger';

export class UserRewardDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Primer reciclaje' })
  name!: string;

  @ApiProperty({ example: 'Recompensa obtenida al registrar el primer reciclaje.' })
  description!: string;

  @ApiProperty({ example: 'Insignia' })
  type!: string;

  @ApiProperty({ example: '2026-06-05T18:30:00Z' })
  earnedAt!: Date;
}

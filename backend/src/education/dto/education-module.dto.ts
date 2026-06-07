import { ApiProperty } from '@nestjs/swagger';

export class EducationModuleDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Introducción al reciclaje' })
  title: string;

  @ApiProperty({ example: 'Conceptos básicos para aprender a separar residuos.' })
  description: string;

  @ApiProperty({ example: 10 })
  estimatedMinutes: number;

  @ApiProperty({ example: false })
  completed: boolean;
}

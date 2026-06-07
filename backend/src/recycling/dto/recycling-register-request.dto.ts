import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class RecyclingRegisterRequestDto {
  @ApiProperty({ example: 'Botella plástica' })
  @IsNotEmpty()
  wasteName: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'Botellas limpias recicladas en casa.', required: false })
  notes?: string;
}

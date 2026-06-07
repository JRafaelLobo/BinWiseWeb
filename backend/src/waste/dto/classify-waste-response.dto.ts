import { ApiProperty } from '@nestjs/swagger';
import { WasteCategory } from '../waste-category.entity';

export class ClassifyWasteResponseDto {
  @ApiProperty({ example: 'Botella plástica' })
  wasteName!: string;

  @ApiProperty()
  category!: WasteCategory;

  @ApiProperty({ example: 0.94 })
  confidence!: number;

  @ApiProperty({ example: 'Depositar en el contenedor amarillo y retirar líquidos antes de reciclar.' })
  recommendation!: string;
}

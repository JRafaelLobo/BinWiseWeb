import { ApiProperty } from '@nestjs/swagger';

export class ClassifyWasteRequestDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Imagen del desecho tomada con la cámara.' })
  image: any;
}

import { ApiProperty } from '@nestjs/swagger';
import { EducationModuleDto } from './education-module.dto';

export class EducationModuleDetailDto extends EducationModuleDto {
  @ApiProperty({ example: 'El reciclaje permite transformar residuos en nuevos productos y reducir la contaminación ambiental.' })
  content: string;
}

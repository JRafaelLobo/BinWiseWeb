import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { EducationService } from './education.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EducationModuleDto } from './dto/education-module.dto';
import { EducationModuleDetailDto } from './dto/education-module-detail.dto';

@ApiTags('Education')
@Controller('api/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get('modules')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener módulos educativos' })
  @ApiResponse({ status: 200, description: 'Módulos obtenidos correctamente.', type: [EducationModuleDto] })
  getModules(@Request() req): Promise<EducationModuleDto[]> {
    return this.educationService.getModules(req.user.userId);
  }

  @Get('modules/:id')
  @ApiOperation({ summary: 'Obtener detalle de un módulo educativo' })
  @ApiResponse({ status: 200, description: 'Módulo obtenido correctamente.', type: EducationModuleDetailDto })
  @ApiResponse({ status: 404, description: 'Módulo no encontrado.' })
  getModuleById(@Param('id') id: number): Promise<EducationModuleDetailDto> {
    return this.educationService.getModuleById(id);
  }
}

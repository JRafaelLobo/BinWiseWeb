import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PointsResponseDto } from './dto/points-response.dto';
import { LevelResponseDto } from './dto/level-response.dto';

@ApiTags('Gamification')
@Controller('api/gamification')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('points')
  @ApiOperation({ summary: 'Obtener puntos del usuario' })
  @ApiResponse({ status: 200, description: 'Puntos obtenidos correctamente.', type: PointsResponseDto })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado.' })
  getPoints(@Request() req): Promise<PointsResponseDto> {
    return this.gamificationService.getPoints(req.user.userId);
  }

  @Get('level')
  @ApiOperation({ summary: 'Obtener nivel del usuario' })
  @ApiResponse({ status: 200, description: 'Nivel obtenido correctamente.', type: LevelResponseDto })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado.' })
  getLevel(@Request() req): Promise<LevelResponseDto> {
    return this.gamificationService.getLevel(req.user.userId);
  }
}

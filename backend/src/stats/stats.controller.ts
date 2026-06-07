import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserStatsDto } from './dto/user-stats.dto';

@ApiTags('Stats')
@Controller('api/stats')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('user')
  @ApiOperation({ summary: 'Obtener estadísticas del usuario' })
  @ApiResponse({ status: 200, description: 'Estadísticas obtenidas correctamente.', type: UserStatsDto })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado.' })
  getUserStats(@Request() req): Promise<UserStatsDto> {
    return this.statsService.getUserStats(req.user.userId);
  }
}

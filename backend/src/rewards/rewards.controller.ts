import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserRewardDto } from './dto/user-reward.dto';

@ApiTags('Rewards')
@Controller('api/rewards')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('user')
  @ApiOperation({ summary: 'Obtener recompensas del usuario' })
  @ApiResponse({ status: 200, description: 'Recompensas obtenidas correctamente.', type: [UserRewardDto] })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado.' })
  getUserRewards(@Request() req): Promise<UserRewardDto[]> {
    return this.rewardsService.getUserRewards(req.user.userId);
  }
}

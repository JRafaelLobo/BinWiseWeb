import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { RecyclingService } from './recycling.service';
import { RecyclingRegisterRequestDto } from './dto/recycling-register-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RecyclingRecord } from './recycling-record.entity';

@ApiTags('Recycling')
@Controller('api/recycling')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RecyclingController {
  constructor(private readonly recyclingService: RecyclingService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar reciclaje' })
  @ApiResponse({ status: 201, description: 'Reciclaje registrado correctamente.', type: RecyclingRecord })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado.' })
  register(@Request() req, @Body() recyclingRegisterRequestDto: RecyclingRegisterRequestDto): Promise<RecyclingRecord> {
    return this.recyclingService.register(req.user.userId, recyclingRegisterRequestDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Obtener historial de reciclaje' })
  @ApiResponse({ status: 200, description: 'Historial obtenido correctamente.', type: [RecyclingRecord] })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado.' })
  getHistory(@Request() req): Promise<RecyclingRecord[]> {
    return this.recyclingService.getHistory(req.user.userId);
  }
}

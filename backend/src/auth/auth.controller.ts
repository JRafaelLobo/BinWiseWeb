import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from './user.entity';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos o incompletos.' })
  register(@Body() registerRequestDto: RegisterRequestDto): Promise<AuthResponseDto> {
    return this.authService.register(registerRequestDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  login(@Body() loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(loginRequestDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente.', type: User })
  @ApiResponse({ status: 401, description: 'Token no enviado o inválido.' })
  getProfile(@Request() req) {
    return req.user;
  }
}

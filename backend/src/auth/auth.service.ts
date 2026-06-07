import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerRequestDto: RegisterRequestDto): Promise<AuthResponseDto> {
    const { name, email, password } = registerRequestDto;

    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, email, password: hashedPassword });
    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { message: 'Usuario registrado correctamente.', token, user };
  }

  async login(loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> {
    const { email, password } = loginRequestDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.jwtService.sign({ id: user.id, email: user.email });
      return { message: 'Inicio de sesión exitoso.', token, user };
    } else {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
  }
}

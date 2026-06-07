import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class AuthResponseDto {
  @ApiProperty({ example: 'Inicio de sesión exitoso' })
  message: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  token: string;

  @ApiProperty()
  user: User;
}

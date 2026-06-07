import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'josue@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  password!: string;
}

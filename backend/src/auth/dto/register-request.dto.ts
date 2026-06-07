import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'Josué Ham' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'josue@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', minLength: 8 })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

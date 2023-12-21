import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, NotContains } from 'class-validator';

export class EmailAuthDto {
  @ApiProperty({
    required: true,
    example: 'demo@demo.com',
  })
  @IsNotEmpty({
    message: 'Email cannot be empty or whitespace',
  })
  @IsEmail(
    {},
    {
      message: 'Email should be email',
    },
  )
  email: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateAreaDto {
  @ApiProperty({
    required: true,
    example: 'John',
  })
  @IsNotEmpty({
    message: 'Name cannot be empty or whitespace',
  })
  @Length(2, 100, {
    message: 'Name must be between 3 and 30 characters long',
  })
  name: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateSentimentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  text: string;
}

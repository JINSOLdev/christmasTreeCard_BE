import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CardTemplate } from '@prisma/client';

export class CreateCardDto {
  @IsOptional()
  @IsString()
  toName: string;

  @IsOptional()
  @IsString()
  fromName: string;

  @IsString()
  message: string;

  @IsEnum(CardTemplate)
  templateType: CardTemplate;
}

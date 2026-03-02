import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateEventInputDTO {
  @ApiProperty({
    example: 'Rock in Rio',
    description: 'Nome do evento',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({
    message: 'Nome do evento é obrigatório',
  })
  @MinLength(1)
  @MaxLength(255)
  name: string

  @ApiProperty({
    example: '2022-12-31T22:00:00.000Z',
    description: 'Data do evento',
    format: 'date-time',
  })
  date: Date

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do parceiro',
    format: 'uuid',
    minLength: 36,
    maxLength: 36,
  })
  @IsString()
  @IsNotEmpty({
    message: 'ID do parceiro é obrigatório',
  })
  @MinLength(1)
  @MaxLength(36)
  partnerId: string

  @ApiPropertyOptional({
    example: 'Descrição do evento',
    description: 'Descrição do evento',
  })
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Descrição do evento',
    description: 'Descrição do evento',
  })
  @IsOptional()
  @IsString()
  description?: string
}

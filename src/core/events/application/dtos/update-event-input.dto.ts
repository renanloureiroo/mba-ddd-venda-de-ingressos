import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDate, IsOptional, IsString } from 'class-validator'

export class UpdateEventInputDTO {
  @ApiPropertyOptional({
    example: 'Novo Nome do Evento',
    description: 'Nome atualizado do evento',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({
    example: 'Nova descrição do evento',
    description: 'Descrição atualizada do evento',
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    example: '2023-12-31T22:00:00.000Z',
    description: 'Nova data do evento',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  date?: Date
}

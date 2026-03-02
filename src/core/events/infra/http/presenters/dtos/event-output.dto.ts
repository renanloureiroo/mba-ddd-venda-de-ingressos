import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class EventOutputDTO {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do evento',
    format: 'uuid',
  })
  id: string

  @ApiProperty({
    example: 'Rock in Rio',
    description: 'Nome do evento',
  })
  name: string

  @ApiPropertyOptional({
    example: 'Maior festival de música do mundo',
    description: 'Descrição do evento',
  })
  description?: string | null

  @ApiProperty({
    example: '2022-12-31T22:00:00.000Z',
    description: 'Data do evento',
    format: 'date-time',
  })
  date: Date
}

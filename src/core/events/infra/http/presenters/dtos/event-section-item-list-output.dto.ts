import { ApiProperty } from '@nestjs/swagger'

export class EventSectionItemListOutputDTO {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'ID da seção do evento',
    format: 'uuid',
  })
  id: string

  @ApiProperty({
    example: 'Pista Premium',
    description: 'Nome da seção do evento',
  })
  name: string

  @ApiProperty({
    example: 250.0,
    description: 'Preço da seção',
  })
  price: number

  @ApiProperty({
    example: 1000,
    description: 'Total de lugares disponíveis na seção',
  })
  totalSpots: number

  @ApiProperty({
    example: 450,
    description: 'Total de lugares reservados na seção',
  })
  totalSpotsReserved: number
}

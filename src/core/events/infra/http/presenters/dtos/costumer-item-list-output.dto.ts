import { ApiProperty } from '@nestjs/swagger'

export class CostumerItemListOutputDTO {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do cliente',
  })
  id: string

  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do cliente',
  })
  name: string
}

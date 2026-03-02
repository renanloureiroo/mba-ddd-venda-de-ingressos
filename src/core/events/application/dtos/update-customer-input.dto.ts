import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateCustomerInputDTO {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string
}

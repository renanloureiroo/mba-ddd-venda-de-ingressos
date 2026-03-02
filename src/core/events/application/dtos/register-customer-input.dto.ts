import { IsNotEmpty, IsString } from 'class-validator'
import { IsCpf } from '../decorators/is-cpf.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterCustomerInputDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do cliente',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: '12345678909',
    description: 'CPF do cliente',
    maxLength: 14,
    minLength: 11,
    required: true,
  })
  @IsCpf()
  @IsNotEmpty({
    message: 'CPF é obrigatório',
  })
  @IsString()
  cpf: string
}

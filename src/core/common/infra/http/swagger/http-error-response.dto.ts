import { ApiProperty } from '@nestjs/swagger'

export class HttpErrorResponseDto {
  @ApiProperty({ example: 400, description: 'Código do status HTTP' })
  statusCode: number

  @ApiProperty({
    example: 'CPF inválido',
    description: 'Mensagem descritiva do erro',
  })
  message: string
}

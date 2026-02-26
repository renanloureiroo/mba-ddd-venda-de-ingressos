import { IsNotEmpty } from 'class-validator'
import { IsCpf } from '../decorators/is-cpf.decorator'

export class RegisterCustomerInputDTO {
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  name: string

  @IsCpf()
  cpf: string
}

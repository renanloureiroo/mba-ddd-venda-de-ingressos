import { DomainError } from '@/core/common/application/domain.error'

export class CustomerAlreadyExistsError extends DomainError {
  constructor(cpf: string) {
    super(`Cliente com CPF ${cpf} já cadastrado`)
    this.name = 'CustomerAlreadyExistsError'
  }
}

import { DomainError } from '@/core/common/application/domain.error'

export class CustomerNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Cliente com ID ${id} não encontrado`)
    this.name = 'CustomerNotFoundError'
  }
}

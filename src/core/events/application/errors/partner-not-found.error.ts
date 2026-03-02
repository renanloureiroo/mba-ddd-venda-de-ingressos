export class PartnerNotFoundError extends Error {
  constructor(id: string) {
    super(`Parceiro com ID ${id} não encontrado`)
    this.name = 'PartnerNotFoundError'
  }
}

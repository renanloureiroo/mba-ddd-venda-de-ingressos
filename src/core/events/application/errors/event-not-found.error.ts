export class EventNotFoundError extends Error {
  constructor(eventId: string) {
    super(`Evento com ID ${eventId} não encontrado`)
    this.name = 'EventNotFoundError'
  }
}

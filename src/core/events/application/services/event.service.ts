import { UnitOfWork } from '@/core/common/application/unit-of-work.interface'
import { EventRepository } from '../../domain/repositories/event.repository'
import { PartnerRepository } from '../../domain/repositories/partner.repository'
import { CreateEventInputDTO } from '../dtos/create-event-input.dto'
import { Logger } from '@nestjs/common'
import { PartnerId } from '../../domain/entities/partner.entity'
import { PartnerNotFoundError } from '../errors/partner-not-found.error'
import { Event, EventId } from '../../domain/entities/event.entity'
import { EventSection } from '../../domain/entities/event-section'
import { UpdateEventInputDTO } from '../dtos/update-event-input.dto'
import { EventNotFoundError } from '../errors/event-not-found.error'

export class EventService {
  private readonly logger = new Logger(EventService.name)

  constructor(
    private readonly eventRepository: EventRepository,
    private readonly partnerRepository: PartnerRepository,
    private readonly uow: UnitOfWork,
  ) {}

  async create(input: CreateEventInputDTO): Promise<Event> {
    this.logger.log(`Iniciando criação do evento com nome ${input.name}`)

    const partner = await this.partnerRepository.findById(
      new PartnerId(input.partnerId),
    )

    if (!partner) {
      this.logger.warn(
        `Tentativa de criar evento com parceiro inválido ${input.partnerId}`,
        {
          input,
        },
      )
      throw new PartnerNotFoundError(input.partnerId)
    }

    const event = partner.initEvent({
      name: input.name,
      date: input.date,
      description: input.description,
    })

    await this.eventRepository.save(event)
    await this.uow.commit()
    this.logger.log(`Evento criado com sucesso com ID ${event.id.value}`)

    return event
  }

  async findSections(eventId: string): Promise<EventSection[]> {
    const events = await this.eventRepository.findById(new EventId(eventId))

    return Array.from(events?.sections ?? [])
  }

  async list(): Promise<Event[]> {
    return this.eventRepository.findAll()
  }

  async update(eventId: string, input: UpdateEventInputDTO) {
    const event = await this.eventRepository.findById(new EventId(eventId))

    if (!event) {
      this.logger.warn(
        `Tentativa de atualizar evento com ID inválido ${eventId}`,
        {
          input,
        },
      )
      throw new EventNotFoundError(eventId)
    }

    if (input?.name) {
      event.changeName(input.name)
    }

    if (input?.description) {
      event.changeDescription(input.description)
    }

    if (input?.date) {
      event.changeDate(input.date)
    }

    await this.eventRepository.save(event)
    await this.uow.commit()
    this.logger.log(`Evento ${event.id.value} atualizado com sucesso`)
  }
}

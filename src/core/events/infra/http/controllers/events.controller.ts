import { EventService } from '@/core/events/application/services/event.service'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EventSectionPresenter } from '../presenters/event-section.presenter'
import { EventSectionItemListOutputDTO } from '../presenters/dtos/event-section-item-list-output.dto'
import { CreateEventInputDTO } from '@/core/events/application/dtos/create-event-input.dto'
import { EventPresenter } from '../presenters/event.presenter'
import { EventOutputDTO } from '../presenters/dtos/event-output.dto'
import { UpdateEventInputDTO } from '@/core/events/application/dtos/update-event-input.dto'

@ApiTags('events')
@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Listar seções de um evento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de seções do evento retornada com sucesso.',
    type: [EventSectionItemListOutputDTO],
  })
  @Get('/:eventId/sections')
  async listSectionsByEventId(@Param('eventId') eventId: string) {
    const sections = await this.eventService.findSections(eventId)

    return EventSectionPresenter.toHttpList(sections)
  }

  @ApiOperation({ summary: 'Criar um novo evento' })
  @ApiResponse({
    status: 201,
    description: 'Evento criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos para a criação do evento.',
  })
  @ApiResponse({
    status: 404,
    description: 'Parceiro informado não foi encontrado.',
  })
  @Post()
  async createEvent(@Body() input: CreateEventInputDTO) {
    await this.eventService.create(input)
    return
  }

  @ApiOperation({ summary: 'Atualizar os dados de um evento' })
  @ApiResponse({
    status: 200,
    description: 'Evento atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado.',
  })
  @Put('/:eventId')
  async updateEvent(
    @Param('eventId') eventId: string,
    @Body() input: UpdateEventInputDTO,
  ) {
    await this.eventService.update(eventId, input)
    return
  }

  @ApiOperation({ summary: 'Listar todos os eventos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos retornada com sucesso.',
    type: [EventOutputDTO],
  })
  @Get()
  async listEvents() {
    const events = await this.eventService.list()
    return EventPresenter.toHttpList(events)
  }
}

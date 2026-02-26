import { Event, EventId } from './event.entity'
import { PartnerId } from './partner.entity'

const EVENT_NAME = 'Apresentação John Doe'
const EVENT_DESCRIPTION = 'Uma apresentação do conhecido John Doe'
const EVENT_DATE = new Date()
const PARTNER_ID = new PartnerId('5cfa1bc4-028e-45ac-9c32-ce4b66c42208')

describe('AggregateRoot: Event', () => {
  it('deve criar um evento com sucesso', () => {
    const event = Event.create({
      name: EVENT_NAME,
      description: EVENT_DESCRIPTION,
      date: EVENT_DATE,
      partnerId: PARTNER_ID,
    })

    expect(event).toBeInstanceOf(Event)
    expect(event.id).toBeInstanceOf(EventId)
    expect(event.sections).toBeInstanceOf(Set)
  })

  it('deve ser possível adicionar uma seção ao evento', () => {
    const event = Event.create({
      name: EVENT_NAME,
      description: EVENT_DESCRIPTION,
      date: EVENT_DATE,
      partnerId: PARTNER_ID,
    })

    expect(event.sections.size).toBe(0)

    event.addSection({
      name: 'Seção 1',
      description: 'Descrição da seção 1',
      totalSpots: 150,
      price: 50,
    })

    expect(event.sections.size).toBe(1)
    expect(event.totalSpots).toBe(150)
  })

  it('deve inicializar sports para cada section', () => {
    const event = Event.create({
      name: EVENT_NAME,
      description: EVENT_DESCRIPTION,
      date: EVENT_DATE,
      partnerId: PARTNER_ID,
    })
    event.addSection({
      name: 'Seção 1',
      description: 'Descrição da seção 1',
      totalSpots: 150,
      price: 50,
    })
    const [section] = event.sections.values()
    expect(section.spots.size).toBe(150)
  })

  it('deve publicar tudo relacionado ao evento', () => {
    const event = Event.create({
      name: EVENT_NAME,
      description: EVENT_DESCRIPTION,
      date: EVENT_DATE,
      partnerId: PARTNER_ID,
    })
    event.addSection({
      name: 'Seção 1',
      description: 'Descrição da seção 1',
      totalSpots: 150,
      price: 50,
    })

    event.addSection({
      name: 'Seção 2',
      description: 'Descrição da seção 2',
      totalSpots: 50,
      price: 100,
    })

    event.publishAll()

    expect(event.isPublished).toBe(true)
    const [section1, section2] = event.sections.values()
    expect(section1.isPublished).toBe(true)
    expect(section2.isPublished).toBe(true)
    section1.spots.forEach((spot) => expect(spot.isPublished).toBe(true))
    section2.spots.forEach((spot) => expect(spot.isPublished).toBe(true))
  })
})

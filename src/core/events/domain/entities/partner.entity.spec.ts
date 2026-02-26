import { Partner } from './partner.entity'

describe('AggregateRoot: Partner', () => {
  it('deve ser possível iniciar um evento', () => {
    const partner = Partner.create({
      email: 'johndoe@email.com',
      name: 'John Doe',
    })

    const event = partner.initEvent({
      name: 'Encontro na praia',
      description: 'Beber e ver o pôr do sol na praia',
      date: new Date(),
    })

    expect(event.partnerId.value).toEqual(partner.id.value)
  })
})

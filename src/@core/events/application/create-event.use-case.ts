import { Injectable } from '@nestjs/common'
import { Transactional } from '@/@core/common/application/transactional.decorator'
import { PartnerRepository } from '@/@core/events/domain/repositories/partner.repository'
import { PartnerId } from '@/@core/events/domain/entities/partner.entity'

export type CreateEventInput = {
  partnerId: string
  name: string
  description?: string | null
  date: Date
}

/**
 * Exemplo real de use case usando @Transactional().
 *
 * O decorator garante que toda a lógica abaixo rode na mesma
 * transação do banco — sem nenhum boilerplate de tx no código.
 */
@Injectable()
export class CreateEventUseCase {
  constructor(
    private readonly partnerRepo: PartnerRepository,
    // eventRepo seria injetado aqui quando existir
  ) {}

  @Transactional()
  async execute(input: CreateEventInput) {
    // 1. Busca o partner — roda dentro da tx ativa
    const partner = await this.partnerRepo.findById(
      new PartnerId(input.partnerId),
    )
    if (!partner) throw new Error(`Partner não encontrado: ${input.partnerId}`)

    // 2. Usa o método de domínio para criar o evento
    const event = partner.initEvent({
      name: input.name,
      description: input.description,
      date: input.date,
    })

    // 3. (quando EventRepository existir) persistir o evento
    // await this.eventRepo.save(event)  ← mesma tx automática!

    // Se qualquer linha acima lançar erro → ROLLBACK automático
    return event.toJson()
  }
}

import { UnitOfWork } from '../application/unit-of-work.interface'
import { Injectable } from '@nestjs/common'

import {
  DrizzleService,
  DrizzleTransaction,
} from '@/core/events/infra/database/drizzle/drizzle.service'

@Injectable()
export class UnitOfWorkDrizzleOrm implements UnitOfWork {
  private operations: ((tx: DrizzleTransaction) => Promise<void>)[] = []

  constructor(private readonly drizzleService: DrizzleService) {}

  registerOperation(task: (tx: DrizzleTransaction) => Promise<void>): void {
    this.operations.push(task)
  }

  async commit(): Promise<void> {
    if (this.operations.length === 0) return

    try {
      await this.drizzleService.db.transaction(async (tx) => {
        for (const operation of this.operations) {
          await operation(tx)
        }
      })
      this.operations = []
    } catch (error) {
      await this.rollback()
      throw error
    }
  }

  async rollback(): Promise<void> {
    this.operations = []
  }
}

import { UnitOfWork } from '@/core/common/application/unit-of-work.interface'

export class InMemoryUnitOfWork implements UnitOfWork {
  private operations: ((tx: any) => Promise<void>)[] = []

  async commit(): Promise<void> {
    for (const operation of this.operations) {
      await operation(null)
    }
  }

  async rollback(): Promise<void> {
    this.operations = []
  }

  registerOperation(task: (tx: any) => Promise<void>): void {
    this.operations.push(task)
  }
}

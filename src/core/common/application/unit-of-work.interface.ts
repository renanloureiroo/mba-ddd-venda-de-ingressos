export abstract class UnitOfWork {
  abstract registerOperation(task: (tx: any) => Promise<void>): void
  abstract commit(): Promise<void>
  abstract rollback(): Promise<void>
}

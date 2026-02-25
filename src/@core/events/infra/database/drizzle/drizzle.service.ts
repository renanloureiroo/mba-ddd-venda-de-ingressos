import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { txStorage } from '@/@core/common/infra/transaction.storage'
import * as schemas from './schemas'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private _db: MySql2Database<typeof schemas>
  private _pool: mysql.Pool

  onModuleInit() {
    this._pool = mysql.createPool({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'events',
    })

    this._db = drizzle(this._pool, { schema: schemas, mode: 'default' })
  }

  async onModuleDestroy() {
    await this._pool.end()
  }

  /**
   * Retorna a transação ativa (se dentro de um @Transactional)
   * ou o db normal caso contrário.
   */
  get db(): MySql2Database<typeof schemas> {
    const tx = txStorage.getStore()
    return (tx as MySql2Database<typeof schemas> | undefined) ?? this._db
  }

  /**
   * Abre uma transação e armazena no AsyncLocalStorage.
   * Todos os repositórios que usam `this.drizzle.db` dentro deste contexto
   * utilizarão automaticamente a mesma transação.
   */
  async runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this._db.transaction((tx) =>
      txStorage.run(tx as unknown as MySql2Database<typeof schemas>, fn),
    )
  }
}

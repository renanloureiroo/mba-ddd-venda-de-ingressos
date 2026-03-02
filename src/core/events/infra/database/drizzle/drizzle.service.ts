import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schemas from './schemas'
import { ExtractTablesWithRelations } from 'drizzle-orm'
import { MySqlTransaction } from 'drizzle-orm/mysql-core'
import {
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
} from 'drizzle-orm/mysql2'

export type DrizzleTransaction = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  typeof schemas,
  ExtractTablesWithRelations<typeof schemas>
>

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

  get db(): MySql2Database<typeof schemas> {
    return this._db
  }
}

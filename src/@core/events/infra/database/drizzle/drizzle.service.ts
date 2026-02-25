import { Injectable, OnModuleInit } from '@nestjs/common'
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as partnerSchema from './schemas/partner.schema'

@Injectable()
export class DrizzleService implements OnModuleInit {
  private _db: MySql2Database<typeof partnerSchema>

  onModuleInit() {
    const pool = mysql.createPool({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'events',
    })

    this._db = drizzle(pool, { schema: partnerSchema, mode: 'default' })
  }

  get db() {
    return this._db
  }
}

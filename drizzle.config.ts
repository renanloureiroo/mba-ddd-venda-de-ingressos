import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'mysql',
  schema: './src/@core/events/infra/database/drizzle/schemas/*.schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'events',
  },
})

import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://practice_buddy:practice_buddy_dev@localhost:5432/practice_buddy',
  },
})
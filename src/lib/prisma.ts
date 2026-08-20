import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  const connectionString = process.env.DATABASE_URL
  if (!connectionString?.startsWith("postgresql://") && !connectionString?.startsWith("postgres://")) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection string")
  }

  const adapter = new PrismaPg({ connectionString })
  const client = new PrismaClient({ adapter })

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client
  }

  return client
}

// Route modules import this during builds. Defer adapter initialization until a
// request actually touches Prisma so build-time module loading never selects a
// provider incompatible with prisma/schema.prisma.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrismaClient()
    const value = Reflect.get(client, property, client)
    return typeof value === "function" ? value.bind(client) : value
  },
})

export default prisma

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** Prefer MONGODB_URI. Ignore placeholder DATABASE_URL from Prisma's example env. */
function resolveMongoUri(): string | undefined {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return undefined;
  // Prisma docs placeholder — treat as unset so we fall back to static studies locally.
  if (databaseUrl.includes("cluster0.ab1cd.mongodb.net")) return undefined;
  return databaseUrl;
}

export function getPrisma(): PrismaClient {
  const uri = resolveMongoUri();
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }
  if (!process.env.MONGODB_URI) {
    process.env.MONGODB_URI = uri;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ["error"],
    });
  }

  return globalForPrisma.prisma;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(resolveMongoUri());
}

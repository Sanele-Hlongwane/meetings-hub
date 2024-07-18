import { PrismaClient, User, Role, Entrepreneur, Investor, PrismaClientKnownRequestError } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

// Exporting types explicitly using `export type`
export type { User, Role, Entrepreneur, Investor, PrismaClientKnownRequestError };
export { PrismaClient };

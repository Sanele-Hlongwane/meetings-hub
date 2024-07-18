import { PrismaClient, User, Role, Entrepreneur, Investor } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
export { User, Role, Entrepreneur, Investor };

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = db
}

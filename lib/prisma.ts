import { PrismaClient, User, Role, Entrepreneur, Investor, ProEntrepreneurProfile, ProInvestorProfile } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
export { User, Role, Entrepreneur, Investor, ProEntrepreneurProfile, ProInvestorProfile };

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

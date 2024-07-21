// types.ts

export type User = {
    id: number;
    clerkId: string;
    email: string;
    name?: string;
    role: 'USER' | 'ENTREPRENEUR' | 'INVESTOR';
    entrepreneur?: Entrepreneur;
    investor?: Investor;
    investments: Investment[];
  };
  
  export type Entrepreneur = {
    id: number;
    userId: number;
    user: User;
    business: string;
    pitch: string;
    investments: Investment[];
  };
  
  export type Investor = {
    id: number;
    userId: number;
    user: User;
    investmentOpportunities: Investment[];
  };
  
  export type Investment = {
    id: number;
    amount: number;
    entrepreneurId: number;
    investorId: number;
    entrepreneur: Entrepreneur;
    investor: Investor;
    user: User;
    userId: number;
    createdAt: Date;
  };
  
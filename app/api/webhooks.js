// /pages/api/webhooks.js
import { PrismaClient } from '@prisma/client';
import { verifyWebhookSignature } from '@clerk/clerk-sdk-node'; // Ensure you have the appropriate Clerk SDK

const prisma = new PrismaClient();

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const signature = req.headers['clerk-signature'];

    // Verify the webhook signature
    if (!verifyWebhookSignature(req.body, signature, CLERK_WEBHOOK_SECRET)) {
      return res.status(403).json({ message: 'Invalid signature' });
    }

    const { type, data } = req.body;

    try {
      switch (type) {
        case 'user.created':
          await prisma.user.create({
            data: {
              id: data.id,
              clerkId: data.id,
              email: data.email_addresses[0].email_address,
              name: `${data.first_name} ${data.last_name}`,
              imageUrl: data.profile_image_url,
              createdAt: new Date(),
              updatedAt: new Date(),
              role: {
                connect: { id: data.role_id },
              },
            },
          });
          break;
        case 'user.updated':
        case 'user.logged_in':
          await prisma.user.upsert({
            where: { clerkId: data.id },
            update: {
              email: data.email_addresses[0].email_address,
              name: `${data.first_name} ${data.last_name}`,
              imageUrl: data.profile_image_url,
              updatedAt: new Date(),
              role: {
                connect: { id: data.role_id },
              },
            },
            create: {
              id: data.id,
              clerkId: data.id,
              email: data.email_addresses[0].email_address,
              name: `${data.first_name} ${data.last_name}`,
              imageUrl: data.profile_image_url,
              createdAt: new Date(),
              updatedAt: new Date(),
              role: {
                connect: { id: data.role_id },
              },
            },
          });
          break;
        case 'user.deleted':
          await prisma.user.delete({
            where: { clerkId: data.id },
          });
          break;
        // Handle other events as necessary
        default:
          console.log(`Unhandled event: ${type}`);
      }

      res.status(200).json({ message: 'Webhook processed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

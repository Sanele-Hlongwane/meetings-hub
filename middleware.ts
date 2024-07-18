import { clerkMiddleware, authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ["/","/guest","/about","/contact","/services"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

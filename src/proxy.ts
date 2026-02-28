// src/proxy.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

// Export the middleware function as default
export default clerkMiddleware({
  // optional: add any options here if needed
});

// Matcher config for which routes to protect
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up).*)",
  ],
};
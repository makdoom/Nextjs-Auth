import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

  // Provider routes
  if (isApiAuthRoute) return;

  if (isAuthRoutes) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return;
  }

  if (!isLoggedIn && !isPublicRoutes)
    return Response.redirect(new URL("/auth/login", nextUrl));

  return;
});

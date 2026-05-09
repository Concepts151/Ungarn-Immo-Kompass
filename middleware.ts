export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Add protected routes here if needed, for instance:
    // "/dashboard/:path*",
    // "/my-profile/:path*"
    // By default below is just a placeholder, modify based on your protection needs
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
};
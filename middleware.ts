import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for path:", request.nextUrl.pathname);

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log("User:", user);

    // Define public routes
    const publicRoutes = ["/", "/categories", "/sign-in", "/sign-up"];
    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

    // Allow access to public routes
    if (isPublicRoute) {
      console.log("Allowing access to public route:", request.nextUrl.pathname);
      return NextResponse.next();
    }

    // Protect dashboard and quizzes routes
    const protectedRoutes = ["/dashboard", "/quizzes"];
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute && !user) {
      console.log("Redirecting to /sign-in (protected route)");
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    console.log("Allowing request to proceed");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next(); // Fallback to allow the request to proceed
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
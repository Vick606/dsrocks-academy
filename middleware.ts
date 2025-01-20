import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for path:", request.nextUrl.pathname);

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log("User:", user);

    // Redirect to login if user is not signed in
    if (!user && !request.nextUrl.pathname.startsWith('/auth') && request.nextUrl.pathname !== '/sign-in') {
      console.log("Redirecting to /sign-in");
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Allow access to auth pages (sign-in, sign-up, forgot-password)
    if (request.nextUrl.pathname.startsWith('/auth')) {
      console.log("Allowing access to auth page");
      return NextResponse.next();
    }

    // Protect dashboard and quizzes routes
    if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/quizzes')) {
      if (!user) {
        console.log("Redirecting to /sign-in (protected route)");
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
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
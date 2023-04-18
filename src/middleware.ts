import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { useAuth } from 'context/AuthContext';

export function middleware(request: NextRequest) {
  let cookie=request.cookies.get('role');
  // const {currentUser} =useAuth()
  // console.log(cookie);
  if (cookie?.value !== "teacherRole" && request.nextUrl.pathname.includes('/Teacher')) {
    return NextResponse.rewrite(new URL('/auth/Login', request.url))
  }

  if (cookie?.value !=="adminRole24" && request.nextUrl.pathname.startsWith('/Admin')) {
    return NextResponse.rewrite(new URL('/auth/Login', request.url))
  }
}
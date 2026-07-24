import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// El secreto para verificar el JWT (debe ser el mismo que en verify/route.ts)
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-dev-key-change-in-production';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 🔒 Headers de seguridad globales (Aplican a todo el sitio)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // 🛡️ Protección exclusiva del módulo Ahorro Dashboard
  if (pathname.startsWith('/ahorro/dashboard')) {
    const sessionCookie = request.cookies.get('ahorro_session')?.value;

    // Si no hay cookie, redirigir al gate de LnAuth
    if (!sessionCookie) {
      const redirectUrl = new URL('/ahorro/access', request.url);
      redirectUrl.searchParams.set('callback', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      // Verificar criptográficamente el JWT
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(sessionCookie, secret);

      // Opcional: Puedes agregar el rol o la pubkey a los headers para usarlos en el Server Component
      response.headers.set('x-user-pubkey', payload.pubkey as string);
      
    } catch (error) {
      // Si el JWT es inválido, expiró o fue manipulado, fuera.
      const redirectUrl = new URL('/ahorro/access', request.url);
      redirectUrl.searchParams.set('error', 'invalid_session');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 🌐 Preparación para Rate Limiting (v2)
  // if (pathname.startsWith('/api/')) { ... }

  return response;
}

export const config = {
  matcher: [
    // Ejecutar el middleware SOLO en el dashboard de ahorro.
    // Next.js ya excluye automáticamente los archivos estáticos (_next, imágenes) 
    // a menos que los incluyas explícitamente.
    '/ahorro/dashboard/:path*',
  ],
};
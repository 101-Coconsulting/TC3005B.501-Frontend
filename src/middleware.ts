import type { MiddlewareHandler } from 'astro';
import { roleRoutes, allWhitelistedRoutes } from '@config/routeAccess';
import { unauthorizedPage } from '@utils/unauthorizedPage';

function matchPath(path: string, patterns: string[]) {
  return patterns.some(pattern => {
    if (pattern.endsWith('/*')) {
      return path.startsWith(pattern.slice(0, -1));
    }
    return path === pattern;
  });
}
export const publicRoutes = [ '/login', '/404' ];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const isDevBypass = import.meta.env.PUBLIC_IS_DEV === true || import.meta.env.PUBLIC_IS_DEV === "true";
  
  // 1. Permitir rutas públicas sin autenticación
  if (matchPath(pathname, publicRoutes)) {
    return next();
  }
  
  // 2. Obtener el rol desde las cookies
  const cookieHeader = request.headers.get('cookie') || '';
  const roleMatch = cookieHeader.match(/(?:^|;\s*)role=([^;]+)/);
  let role = roleMatch ? decodeURIComponent(roleMatch[1]) : '';
  const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  let isAuthenticated = !!tokenMatch || !!role; // Consider authenticated if role exists

  // Development bypass: allow viewing screens without login by setting mock cookies.
  if (isDevBypass && !role) {
    const mockRole = 'Solicitante';
    context.cookies.set('token', 'dev-token', { path: '/' });
    context.cookies.set('role', mockRole, { path: '/' });
    context.cookies.set('username', 'Dev User', { path: '/' });
    context.cookies.set('user_id', '1', { path: '/' });
    context.cookies.set('department_id', '1', { path: '/' });
    role = mockRole;
    isAuthenticated = true;
  }
  const html = unauthorizedPage(pathname, isAuthenticated);

  // 2.1 Si no hay rol, redirigir a la página de inicio de sesión
  if (!role) {
    return Response.redirect(new URL('/login', request.url), 302);
  }

  // 3. Validar si la ruta está registrada en el sistema
  const isKnownRoute = matchPath(pathname, allWhitelistedRoutes);
  if (!isKnownRoute) {
    //return Response.redirect(new URL('/404', request.url), 302);
    return new Response(html, { status: 404, headers: { 'Content-Type': 'text/html' } });
  }

  // 4. Validar si el rol tiene acceso a la ruta
  const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes] ?? [];
  const isAuthorized = matchPath(pathname, allowedRoutes);

  if (!isAuthorized) {
    //return Response.redirect(new URL('/404', request.url), 302);
    return new Response(html, { status: 404, headers: { 'Content-Type': 'text/html' } });
  }

  return next();
};
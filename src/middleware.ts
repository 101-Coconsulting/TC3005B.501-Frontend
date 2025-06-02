import type { MiddlewareHandler } from 'astro';
import { roleRoutes, allWhitelistedRoutes } from '@config/routeAccess';

function matchPath(path: string, patterns: string[]) {
  return patterns.some(pattern => {
    if (pattern.endsWith('/*')) {
      return path.startsWith(pattern.slice(0, -1));
    }
    return path === pattern;
  });
}

export const publicRoutes = [
    '/login'
  ];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const pathname = new URL(context.request.url).pathname;

  // Obtenemos el rol desde cookies
  if (matchPath(pathname, publicRoutes)) {
    return next();
  }
  const cookieHeader = context.request.headers.get('cookie') || '';
  const match = cookieHeader.match(/role=([^;]+)/);
  const role = decodeURIComponent(match?.[1] || '');

  // Primero: verificar si la ruta está registrada
  const isKnownRoute = matchPath(pathname, allWhitelistedRoutes);
  if (!isKnownRoute) {
    return new Response(null, { status: 404 });
  }

  // Segundo: verificar si el rol puede acceder a esa ruta
  const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes] || [];
  const isAuthorized = matchPath(pathname, allowedRoutes);

  if (!isAuthorized) {
    return new Response(null, { status: 404 });
  }

  return next();
};
import type { UserRole } from '@type/roles';

export const roleRoutes: Record<UserRole, string[]> = {
  'Solicitante': ['/dashboard', '/perfil-usuario','/crear-solicitud','/historial','/reembolso','/solicitudes-draft','/comprobar-gastos','/completar-draft/*','/editar-solicitud/*','/comprobar-solicitud/*','/detalles-solicitud/*','/subir-comprobante/*'],
  'Agencia de viajes': ['/dashboard', '/perfil-usuario', '/atenciones', '/atender-solicitud/*'],
  'Cuentas por pagar': ['/dashboard', '/perfil-usuario', '/cotizaciones', '/comprobaciones', '/cotizar-solicitud/*', '/comprobar-gastos/*'],
  'N1': ['/dashboard', '/perfil-usuario', '/solicitudes-autorizador', '/crear-solicitud','/historial','/reembolso','/solicitudes-draft','/comprobar-gastos','/completar-draft/*','/editar-solicitud/*','/comprobar-solicitud/*','/autorizaciones','/detalles-solicitud/*','/autorizar-solicitud/*','/subir-comprobante/*'],
  'N2': ['/dashboard', '/perfil-usuario', '/solicitudes-autorizador', '/crear-solicitud','/historial','/reembolso','/solicitudes-draft','/comprobar-gastos','/completar-draft/*','/editar-solicitud/*','/comprobar-solicitud/*','/autorizaciones','/detalles-solicitud/*','/autorizar-solicitud/*','/subir-comprobante/*'],
  'Administrador': ['/dashboard', '/perfil-usuario','/crear-usuario'],
};

export const allWhitelistedRoutes: string[] = Object.values(roleRoutes).flat();
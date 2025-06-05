export interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

export const SIDEBAR_CONFIG: Record<string, MenuItem[]> = {
  'Solicitante': [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'CREAR SOLICITUD', route: '/crear-solicitud', icon: 'flight' },
    { label: 'DRAFT SOLICITUDES', route: '/solicitudes-draft', icon: 'draft' },
    { label: 'COMPROBAR GASTOS', route: '/comprobar-gastos', icon: 'payments' },
    { label: 'REEMBOLSOS', route: '/reembolso', icon: 'paid' },
    { label: 'HISTORIAL DE VIAJES', route: '/historial', icon: 'inventory' }
  ],
  'N1': [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'AUTORIZACIONES', route: '/autorizaciones', icon: 'check_box' },
    { label: 'SOLICITUDES', route: '/solicitudes-autorizador', icon: 'check_box' },
    { label: 'CREAR SOLICITUD', route: '/crear-solicitud', icon: 'flight' },
    { label: 'DRAFT SOLICITUDES', route: '/solicitudes-draft', icon: 'draft' },
    { label: 'COMPROBAR GASTOS', route: '/comprobar-gastos', icon: 'payments' },
    { label: 'REEMBOLSOS', route: '/reembolso', icon: 'paid' },
    { label: 'HISTORIAL DE VIAJES', route: '/historial', icon: 'inventory' }
  ],
  'N2': [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'AUTORIZACIONES', route: '/autorizaciones', icon: 'check_box' },
    { label: 'SOLICITUDES', route: '/solicitudes-autorizador', icon: 'check_box' },
    { label: 'CREAR SOLICITUD', route: '/crear-solicitud', icon: 'flight' },
    { label: 'DRAFT SOLICITUDES', route: '/solicitudes-draft', icon: 'draft' },
    { label: 'COMPROBAR GASTOS', route: '/comprobar-gastos', icon: 'payments' },
    { label: 'REEMBOLSOS', route: '/reembolso', icon: 'paid' },
    { label: 'HISTORIAL DE VIAJES', route: '/historial', icon: 'inventory' }
  ],
  'Cuentas por pagar': [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'COTIZACIONES', route: '/cotizaciones', icon: 'paid' },
    { label: 'COMPROBACIONES', route: '/comprobaciones', icon: 'receipt' }
  ],
  'Agencia de viajes': [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'ATENCIONES', route: '/atenciones', icon: 'breaking_news_alt_1' }
  ],
  'Administrador': [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'USUARIOS/ROLES', route: '/admin-users', icon: 'manage_accounts' }
  ]
};

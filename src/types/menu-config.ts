export interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

export const SIDEBAR_CONFIG: Record<string, MenuItem[]> = {
  Applicant: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'CREAR SOLICITUD', route: '/crear-solicitud', icon: 'flight' },
    { label: 'DRAFT SOLICITUDES', route: '/solicitudes-draft', icon: 'draft' },
    { label: 'COMPROBAR GASTOS', route: '/comprobar-gastos', icon: 'payments' },
    { label: 'REEMBOLSOS', route: '/reembolso', icon: 'paid' },
    { label: 'HISTORIAL DE VIAJES', route: '/historial', icon: 'inventory' }
  ],
  Authorizer: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'AUTORIZACIONES', route: '/autorizaciones', icon: 'check_box' }
  ],  
  AccountsPayable: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'COTIZACIONES', route: '/cotizaciones', icon: 'paid' },
    { label: 'COMPROBACIONES', route: '/comprobaciones', icon: 'receipt' }
  ],
  TravelAgency: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'ATENCIONES', route: '/atenciones', icon: 'breaking_news_alt_1' }
  ],
  Admin: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'USUARIOS/ROLES', route: '/admin-users', icon: 'manage_accounts' }
  ]
};

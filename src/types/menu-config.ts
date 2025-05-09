export interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

export const SIDEBAR_CONFIG: Record<string, MenuItem[]> = {
  Applicant: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'SOLICITUD DE VIAJE', route: '/solicitud', icon: 'flight' },
    { label: 'COMPROBAR GASTOS', route: '/comprobante', icon: 'payments' },
    { label: 'HISTORIAL DE VIAJE', route: '/historial', icon: 'inventory' }
  ],
  Authorizer: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
    { label: 'AUTORIZACIONES', route: '/autorizaciones', icon: 'check_box' }
  ],  
  AccountsPayable: [
    { label: 'DASHBOARD', route: '/dashboard', icon: 'home' },
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

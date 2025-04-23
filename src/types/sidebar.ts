import SignInIcon from '../assets/sign-in.svg';

export type UserRole = 
    | 'Applicant'
    | 'Authorizer';

export interface MenuItem {
    label: string;
    route: string;
    icon: typeof SignInIcon;
}

export const SIDEBAR_CONFIG: Record<UserRole, MenuItem[]> = {
  Applicant: [
    { label: 'DASHBOARD', route: '/dashboard', icon: SignInIcon },
    { label: 'SOLICITUD DE VIAJE', route: '/solicitud', icon: SignInIcon },
    { label: 'COMPROBAR GASTOS', route: '/comprobante', icon: SignInIcon },
    { label: 'HISTORIAL DE VIAJE ', route: '/historial', icon: SignInIcon},
  ],
  Authorizer: [
    { label: 'DASHBOARD', route: '/dashboard', icon: SignInIcon},
    { label: 'SOLICITUDES', route: '/autorizaciones', icon: SignInIcon},
  ]
};

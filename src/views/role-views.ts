import ApplicantView from "@views/ApplicantView.astro";
import AuthorizerView from "@views/AuthorizerView.astro";
import AdminView from "@views/AdminView.astro";
import AccountsPayableView from "@views/AccountsPayableView.astro";
import TravelAgencyView from "@views/TravelAgencyView.astro";

import type { UserRole } from "@type/roles";

export const roleViews: Record<UserRole, any> = {
    'Solicitante': ApplicantView,
    'N1': AuthorizerView,
    'N2': AuthorizerView,
    'Administrador': AdminView,
    'Cuentas por pagar': AccountsPayableView,
    'Agencia de viajes': TravelAgencyView,
};
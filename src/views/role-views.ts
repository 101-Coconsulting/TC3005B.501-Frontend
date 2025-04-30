import ApplicantView from "@views/ApplicantView.astro";
import AuthorizerView from "@views/AuthorizerView.astro";
import AdminView from "@views/AdminView.astro";
import AccountsPayableView from "@views/AccountsPayableView.astro";
import TravelAgencyView from "@views/TravelAgencyView.astro";

import type { UserRole } from "@type/roles";

export const roleViews: Record<UserRole, any> = {
    Applicant: ApplicantView,
    Authorizer: AuthorizerView,
    Admin: AdminView,
    AccountsPayable: AccountsPayableView,
    TravelAgency: TravelAgencyView,
};

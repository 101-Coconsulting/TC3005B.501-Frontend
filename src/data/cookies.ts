import type { UserRole } from "@type/roles";

const mockCookies = {
    username: "John Doe",
    role: "TravelAgency" as UserRole //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
};

export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
    return mockCookies[key];
};

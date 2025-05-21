import type { UserRole } from "@type/roles";

const mockCookies = {
    username: "John Doe",
    id: "1",
    role: "Applicant" as UserRole, //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
    dept:"2"
};

export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
    return mockCookies[key];
};

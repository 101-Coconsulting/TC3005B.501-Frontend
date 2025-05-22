import type { UserRole } from "@type/roles";

const mockCookies = {
    username: "John Doe",
    id: "2",
    department_id: "1",
    role: "Authorizer" as UserRole //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
};

export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
    return mockCookies[key];
};
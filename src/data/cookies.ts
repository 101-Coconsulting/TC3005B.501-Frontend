import type { UserRole } from "@type/roles";

const mockCookies = {
    username: "John Doe",
    id: "3",
    department_id: "3",
    role: "Applicant" as UserRole //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
};

export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
    return mockCookies[key];
};

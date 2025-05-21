import type { UserRole } from "@type/roles";

const mockCookies = {
    username: "John Doe",
    id: "4",  //4 es un authorizer
    dept: "1",
    role: "Authorizer" as UserRole //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
};

export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
    return mockCookies[key];
};

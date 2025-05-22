import type { UserRole } from "@type/roles";

const mockCookies = {
    username: "John Doe",
    id: "4",
    department_id: "4",
    role: "AccountsPayable" as UserRole //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
};

export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
    return mockCookies[key];
};

/*
COOKIES WITH DATA:

1. Authorizer:
    department_id:1

2. Admin:
    department_id:

3. AccountsPayable:
    department_id:

4.TravelAgency:
    department_id:
*/
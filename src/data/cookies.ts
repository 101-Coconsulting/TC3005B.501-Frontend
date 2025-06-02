// import type { UserRole } from "@type/roles";

// const mockCookies = {
//     username: "John Doe",
//     id: "1",
//     department_id: "1",
//     role: "Applicant" as UserRole //'Applicant' | 'Authorizer' | 'Admin' | 'AccountsPayable' | 'TravelAgency';
// };

// export const getCookie = (key: keyof typeof mockCookies): string | UserRole => {
//     return mockCookies[key];
// };

// /*
// COOKIES WITH DATA:

// 1. Authorizer:
//     department_id:1

// 2. Admin:
//     department_id:

// 3. AccountsPayable:
//     department_id:

// 4.TravelAgency:
//     department_id:
// */

import type { APIContext } from "astro";
import type { UserRole } from "@type/roles";

// Lista de roles válidos
const validRoles: UserRole[] = [
  "Applicant",
  "Authorizer",
  "Admin",
  "AccountsPayable",
  "TravelAgency",
];

// Verifica si un string corresponde a un rol válido
const isUserRole = (value: string | null): value is UserRole =>
  !!value && validRoles.includes(value as UserRole);

// Traducción de español a UserRole
function mapRoleNameToUserRole(raw: string): UserRole {
  switch (raw.trim().toLowerCase()) {
    case "solicitante": return "Applicant";
    case "n1":
    case "n2": return "Authorizer";
    case "administrador": return "Admin";
    case "cuentas por pagar": return "AccountsPayable";
    case "agencia de viajes": return "TravelAgency";
    default: return "Applicant"; // fallback
  }
}

// Estructura de sesión
export type Session = {
  username: string;
  id: string;
  department_id?: string;
  role: UserRole;
};

// Sesión de desarrollo por defecto
const mockSession: Session = {
  username: "John Doe",
  id: "1",
  department_id: "1",
  role: "Applicant",
};

// Resolver cookies si no se pasan explícitamente (ej. uso directo de getCookie)
function resolveCookies(): APIContext["cookies"] | null {
  const astro = (globalThis as any).Astro;
  if (astro && astro.cookies && typeof astro.cookies.get === "function") {
    return astro.cookies;
  }
  console.warn("[WARN] resolveCookies(): Astro.cookies is not available in this context.");
  return null;
}

// Obtener sesión desde cookies reales (o mock si no hay contexto SSR)
export function getSession(cookies?: APIContext["cookies"]): Session {
  const realCookies = cookies || resolveCookies();

  if (!realCookies) {
    console.warn("[WARN] No cookies available, returning mock session");
    return mockSession;
  }

  const username = realCookies.get("username")?.value || "";
  const id = realCookies.get("id")?.value || "";
  const department_id = realCookies.get("department_id")?.value || "";
  const roleRaw = realCookies.get("role")?.value || "";
  const role = mapRoleNameToUserRole(roleRaw);

  const session = { username, id, department_id, role };

  if (import.meta.env.DEV) {
    console.log("[DEBUG] getSession cookies:", session);
  }

  return session;
}

// Acceso directo tipo getCookie("role")
type CookieKey = keyof Session;

export function getCookie(key: CookieKey, cookies?: APIContext["cookies"]): string | UserRole {
  return getSession(cookies)[key];
}

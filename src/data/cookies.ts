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

import type { APIContext } from "astro";
import type { UserRole } from "@type/roles";

export type Session = {
  username: string;
  id: string;
  role: UserRole;
  department_id?: string;
};

const mockSession: Session = {
  username: "John Doe",
  id: "1",
  department_id: "1",
  role: "Solicitante" as UserRole, // 'Solicitante' | 'Agencia de viajes' | 'Cuentas por pagar' | 'N1' | 'N2' | 'Administrador'
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
  const role = realCookies.get("role")?.value || "";
  
  const session: Session = { username, id, department_id, role: role as UserRole };

  if (process.env.NODE_ENV === "development") {
    //console.log("[DEBUG] getSession cookies:", session);
  }

  return session;
}

type CookieKey = keyof Session;

export function getCookie(key: CookieKey, cookies?: APIContext["cookies"]): string | UserRole {
  return getSession(cookies)[key];
}

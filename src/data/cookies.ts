import type { APIContext } from "astro";
import type { UserRole } from "@type/roles";

export type Session = {
  username: string;
  id: string;
  role: UserRole;
  department_id?: string;
  token: string;
};

// Mock session para cuando no haya cookies disponibles
const mockSession: Session = {
  username: "John Doe",
  id: "1",
  department_id: "1",
  role: "Solicitante" as UserRole, // 'Solicitante' | 'Agencia de viajes' | 'Cuentas por pagar' | 'N1' | 'N2' | 'Administrador'
  token: "mock-token"
};

// Resolver cookies si no se pasan explícitamente
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
  const token = realCookies.get("token")?.value || "";

  const session: Session = { username, id, department_id, role: role as UserRole, token };

  if (process.env.NODE_ENV === "development") {
    console.log("[DEBUG] getSession cookies:", session);
  }

  return session;
}

// Función específica para obtener el token
export function getToken(cookies?: APIContext["cookies"]): string {
  return getSession(cookies).token;
}

// Obtener cualquier otra cookie
export function getCookie(key: keyof Session, cookies?: APIContext["cookies"]): string | UserRole {
  return getSession(cookies)[key];
}
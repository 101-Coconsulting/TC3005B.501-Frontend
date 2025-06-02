/**
 * Author: Diego Ortega Fernández
 *
 **/

import TableHeader from '@components/Table/TableHeader.tsx';
import TableRow from '@components/Table/TableRow.tsx';

import type { UserRole } from "@type/roles";
import { getCookie } from "@data/cookies";
// For React components, we need to handle Astro.cookies differently
// This will be handled by the cookies.ts module's resolveCookies function
//const role: UserRole = getCookie("role") as UserRole;

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  rows: Record<string, any>[];
  role: UserRole; 
  type?: string;
}

const roleDictionary = {
  Authorizer: "autorizar-solicitud",
  AccountsPayable: "cotizar-solicitud",
  TravelAgency: "atender-solicitud",
} as const;

type ValidRole = keyof typeof roleDictionary;

function getRoleHref(role: UserRole, type: string): string {
  if (type) {
    return type;
  }
  if (role in roleDictionary) {
    return roleDictionary[role as ValidRole];
  }
  return "error";
}


export default function DataTable({ columns, rows, type, role }: Props) {
  const isLoading = rows.length === 0;
  const roleHref = getRoleHref(role, type ?? "");

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="rounded-md shadow-md overflow-hidden">
      <table className="min-w-full bg-white">
        <TableHeader columns={columns} />
        <tbody>
          {rows.map((row, index) => (
            <TableRow key={index} row={row} columns={columns} index={index} role_href={roleHref}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

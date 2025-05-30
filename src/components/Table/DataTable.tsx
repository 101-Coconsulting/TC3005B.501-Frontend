/**
 * Author: Diego Ortega Fernández
 *
 **/

import TableHeader from '@components/Table/TableHeader.tsx';
import TableRow from '@components/Table/TableRow.tsx';

import type { UserRole } from "@type/roles";
import { getCookie } from "@data/cookies";
const role: UserRole = getCookie("role") as UserRole;

const roleDictionary = {
  Authorizer: "autorizar-solicitud",
  AccountsPayable: "cotizar-solicitud",
  TravelAgency: "atender-solicitud",
} as const;

type ValidRole = keyof typeof roleDictionary;

function getRoleHref(role: UserRole): string {
  if (role in roleDictionary) {
    return roleDictionary[role as ValidRole];
  }
  return "error";
}

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  rows: Record<string, any>[];
}

export default function DataTable({ columns, rows }: Props) {
  const isLoading = rows.length === 0;
  const roleHref = getRoleHref(role);

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

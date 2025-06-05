/**
 * Author: Diego Ortega Fernández
 *
 **/

import { useState, useEffect } from 'react';
import DataTable from '@components/Table/DataTable';
import Pagination from '@components/Table/Pagination';
import type { UserRole } from "@type/roles";

interface Props {
  data: any[];
  type?: string;
  role: UserRole;
}

interface Column {
  key: string;
  label: string;
}

const columns: Column[] = [
  { key: 'request_id', label: 'ID Viaje' },
  { key: 'status', label: 'Status' },
  { key: 'destination', label: 'Destino' },
  { key: 'departure_date', label: 'Fecha Salida' },
  { key: 'arrival_date', label: 'Fecha Llegada' },
  { key: 'action', label: 'Acciones' },
];

function mapRequestToTableRow(request: Record<string, any>): Record<string, any> {
  return {
    status: request.request_status,
    request_id: request.request_id,
    destination: request.destination_country,
    arrival_date: request.ending_date,
    departure_date: request.beginning_date
  };
}

export default function AuthorizerRequestsList({ data, type, role }: Props) {
  const requestsPerPage = 10;
  const [page, setPage] = useState(1);
  const [visibleRequests, setVisibleRequests] = useState<Record<string, any>[]>([]);
  const totalPages = Math.ceil(data.length / requestsPerPage);
  
  useEffect(() => {
    const start = (page - 1) * requestsPerPage;
    const end = start + requestsPerPage;
    
    const paged = data.slice(start, end).map(mapRequestToTableRow);
    setVisibleRequests(paged);
  }, [page, data]);
  
  return (
    <div>
      <div className="flex flex-col w-full gap-4 min-h-160">
        <DataTable columns={columns} rows={visibleRequests} type={type} role={role}/>
      </div>
      <Pagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        maxVisible={5}
      />
    </div>
  );
}

/**
 * Author: Eduardo Porto Morales & Hector Julian Zarate Ramirez
 * 
 * Description: This component uses React to render client side de useState to manage pagination.
 */

import { useState } from "react";
import Pagination from "@/components/Table/Pagination";

interface Props {
  data: any[];
  itemsPerPage?: number;
}

export default function History({ data , itemsPerPage = 5 }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageRequests = data.slice(start, end);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Aprobado":
        return "bg-green-200 text-green-800";
      case "Pendiente":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-red-200 text-red-800";
    }
  };

  return (
    <div>
			<div className="bg-white p-6 rounded-lg shadow w-full">
        {data.length > 0 ? (
          <div>
            {pageRequests.map((request: any) => (
              <a
                key={request.request_id}
                href={`/detalles-solicitud/${request.request_id}`}
                className="flex items-center justify-between max-w-4xl content-wrapper"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">#{request.request_id}</h2>
                  <p className="text-sm">Origen: {request.origin_country}</p>
                  <p className="text-sm">Destino: {request.destination_country}</p>
                  <p className="text-sm">Fecha Inicio: {request.beginning_date}</p>
                  <p className="text-sm">Fecha Fin: {request.ending_date}</p>
                </div>
                <p className={`text-center text-xs font-medium px-3 py-2 rounded-md shadow-sm ${getStatusStyle(request.currentStatus)}`}>
                  {(request.status || "DESCONOCIDO").toUpperCase()}
                </p>
              </a>
            ))}
            <Pagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              maxVisible={5}
            />
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow w-full text-center text-gray-500 font-semibold">
            NO CUENTAS CON VIAJES COMPLETADOS, CANCELADOS O RECHAZADOS
          </div>
        )}
			</div>
    </div>
  );
}

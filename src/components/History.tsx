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
                <div className="flex justify-center mb-6">
                <a
                  key={request.request_id}
                  href={`/detalles-solicitud/${request.request_id}`}
                  className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl bg-gray-50 rounded-lg shadow-md p-6 transition hover:shadow-lg hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-1 text-center md:text-left">
                    #{request.request_id}
                  </h2>
                  <div className="grid grid-cols-2 gap-24 w-full">
                    <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Origen:</span> {request.origin_country}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Destino:</span> {request.destination_country}
                    </p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Fecha Inicio:</span> {request.beginning_date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Fecha Fin:</span> {request.ending_date}
                    </p>
                    </div>
                  </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0 flex flex-col items-center">
                  <span className={`text-xs font-semibold px-4 py-2 rounded-full shadow ${getStatusStyle(request.currentStatus)}`}>
                    {(request.status || "DESCONOCIDO").toUpperCase()}
                  </span>
                  </div>
                </a>
                </div>
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

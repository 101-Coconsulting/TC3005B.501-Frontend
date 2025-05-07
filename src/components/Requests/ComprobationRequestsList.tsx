/**
 * Author: Diego Ortega
 *
 * Description:
 * This component displays a paginated list of Comprobaciones.
 * It fetches data passed as a prop and renders it in a table with pagination controls.
 *
 * Usage Example:
 * <ComprobationRequestsList client:visible data={...} headers={...} />
 *
 * Props:
 * data: An array of objects containing the comprobation data to display. Each object
 * should have properties matching the keys in the 'headers' prop.
 * itemsPerPage: The number of items to display per page. Defaults to 10.
 * headers: An array of strings representing the column headers for the table.
 */

import React, { useState, useEffect } from 'react';
import Pagination from '@components/Pagination';
import TableFallback from '@components/TableFallback.astro';

interface TravelRequestData {
  Status: any;
  "ID Viaje": any;
  Destino?: string;
  "Fecha Llegada"?: string;
  "Fecha Salida"?: string;
  Motivo?: string;
  routes?: {
    destination_city?: string;
    ending_date?: string;
    beginning_date?: string;
  };
  request_status_id: any;
  request_id: any;
  notes?: string;
}

interface Props {
  data: TravelRequestData[];
  itemsPerPage?: number;
  headers: string[];
}

export default function ComprobationRequestsList({ data, itemsPerPage = 10, headers }: Props) {
  const [page, setPage] = useState(1);
  const [pagedRequests, setPagedRequests] = useState<TravelRequestData[]>([]); 
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const newPagedRequests = data.slice(start, end).map((request) => ({
      Status: request.request_status_id,
      "ID Viaje": request.request_id,
      Destino: request.routes?.destination_city,
      "Fecha Llegada": request.routes?.ending_date,
      "Fecha Salida": request.routes?.beginning_date,
      Motivo: request.notes,
    }));
    setPagedRequests(newPagedRequests);
  }, [page, data, itemsPerPage]);

  const modifyIndex = headers.indexOf("MODIFICAR");

  return (
    <div>
      {data.length === 0 ? (
        <TableFallback type="Alert" size="medium" className="mt-4" />
      ) : (
        <>
          <table className="w-full border-collapse bg-white rounded-md shadow-md overflow-hidden mt-4">
            <thead>
              <tr className="bg-neutral-200">
                {headers.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold text-left text-neutral-800">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedRequests.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  {headers.map((header, headerIndex) => (
                    <td key={header} className="px-4 py-3 border-b border-neutral-200">
                      {headerIndex === modifyIndex ? (
                        <div className="flex justify-center">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition duration-300 ease-in-out">
                            Editar
                          </button>
                        </div>
                      ) : (
                        row[header]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              maxVisible={5}
            />
          )}
        </>
      )}
    </div>
  );
}
/**
 * Author: Eduardo Porto Morales & Hector Julian Zarate Ramirez
 * 
 * Description: This component uses React to render client side de useState to manage pagination.
 */

import { useState } from "react";
import Pagination from "@/components/Pagination";

interface Request {
  applicantName: string;
  travelPlace: string;
  travelDate: string;
  currentStatus: string;
}

interface Props {
  data: Request[];
  itemsPerPage?: number;
}

export default function History({ data, itemsPerPage = 5 }: Props) {
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
			<div className="flex flex-col items-center w-full gap-4 min-h-160">
				{pageRequests.map((request, index) => (
					<a
						key={start + index}
						href={`/historial/${start + index}`}
						className="flex items-center justify-between bg-white text-black p-4 rounded-md shadow-sm hover:bg-neutral-300 w-full max-w-4xl border border-neutral-300 transform transition-transform duration-200 hover:scale-105"
					>
						<div className="flex flex-col gap-1">
							<h2 className="text-lg font-semibold">{request.applicantName}</h2>
							<p className="text-sm">Destino: {request.travelPlace}</p>
							<p className="text-sm">Fecha: {request.travelDate}</p>
						</div>
						<p className={`text-center text-xs font-medium px-3 py-2 rounded-md shadow-sm ${getStatusStyle(request.currentStatus)}`}>
							{request.currentStatus}
						</p>
					</a>
				))}
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

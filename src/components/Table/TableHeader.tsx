/**
 * Author: Diego Ortega Fernández
 *
 **/

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
}

export default function TableHeader({ columns }: Props) {
  return (
    <thead>
      <tr className="bg-gray-200">
        {columns.map((col) => (
            <th
              key={col.key}
              className={`px-2 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-sm md:text-md text-gray-700 ${
                col.key === 'action' ? 'text-center' : 'text-left'
              }`}
              >
              {col.label}
            </th>
        ))}
      </tr>
    </thead>
  );
}

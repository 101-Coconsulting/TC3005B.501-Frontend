import React from 'react';
import type { TravelRoute } from '@/types/TravelRoute';

interface RouteInputGroupProps {
  route: TravelRoute;
  onChange: (index: number, name: string, value: any) => void;
  index: number;
  onRemove?: (index: number) => void;
  isRemovable: boolean;
}

const inputStyle = 'border border-gray-300 p-2 rounded w-full bg-white';

const RouteInputGroup: React.FC<RouteInputGroupProps> = ({ route, onChange, index, onRemove, isRemovable }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    onChange(index, name, type === 'checkbox' ? checked : value);
  };

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-700">Ruta #{index + 1}</h4>
        {isRemovable && onRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Eliminar Ruta
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">País de Origen</label>
          <input name="origin_country_name" placeholder="País Origen" className={inputStyle} value={route.origin_country_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ciudad de Origen</label>
          <input name="origin_city_name" placeholder="Ciudad Origen" className={inputStyle} value={route.origin_city_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">País de Destino</label>
          <input name="destination_country_name" placeholder="País Destino" className={inputStyle} value={route.destination_country_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ciudad de Destino</label>
          <input name="destination_city_name" placeholder="Ciudad Destino" className={inputStyle} value={route.destination_city_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de Inicio (MM/DD/YYYY)</label>
          <input name="beginning_date" type="date" className={inputStyle} value={route.beginning_date} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hora de Inicio (HH:MM AM/PM)</label>
          <input name="beginning_time" type="time" className={inputStyle} value={route.beginning_time} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de Fin (MM/DD/YYYY)</label>
          <input name="ending_date" type="date" className={inputStyle} value={route.ending_date} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hora de Fin (HH:MM AM/PM)</label>
          <input name="ending_time" type="time" className={inputStyle} value={route.ending_time} onChange={handleInputChange} required />
        </div>
        <label className="flex items-center gap-2 my-2">
          <input type="checkbox" name="plane_needed" checked={route.plane_needed} onChange={handleInputChange} />
          ¿Requiere Avión?
        </label>
        <label className="flex items-center gap-2 my-2">
          <input type="checkbox" name="hotel_needed" checked={route.hotel_needed} onChange={handleInputChange} />
          ¿Requiere Hotel?
        </label>
      </div>
    </div>
  );
};

export default RouteInputGroup;
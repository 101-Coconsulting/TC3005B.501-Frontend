import { useState, useEffect } from 'react';
import { apiRequest } from '@utils/apiClient';
import { getCookie } from '@/data/cookies';
import type { AdditionalRoute } from '@/types/AdditionalRoute';
import type { FormData } from '@/types/FormData';
import type { DepartmentData } from '@/types/DepartmentData';

interface Props {
  data?: any[];
}

const initialFormState: FormData = {
  router_index: 0,
  notes: '',
  requested_fee: '',
  imposed_fee: '',
  origin_country_name: '',
  origin_city_name: '',
  destination_country_name: '',
  destination_city_name: '',
  beginning_date: '',
  beginning_time: '',
  ending_date: '',
  ending_time: '',
  plane_needed: false,
  hotel_needed: false,
  additionalRoutes: [],
};

const initialRoute: AdditionalRoute = {
  router_index: 0,
  origin_country_name: '',
  origin_city_name: '',
  destination_country_name: '',
  destination_city_name: '',
  beginning_date: '',
  beginning_time: '',
  ending_date: '',
  ending_time: '',
  plane_needed: false,
  hotel_needed: false
};


export default function TravelRequestForm({ data }: Props) {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [newRoute, setNewRoute] = useState(initialRoute);
  const [deptData, setDeptData] = useState<DepartmentData | null>(null);
  const [isMultiDestination, setIsMultiDestination] = useState(false);

  const inputStyle = 'border border-gray-300 p-2 rounded w-full bg-white';

    useEffect(() => {
    async function fetchDepartmentInfo() {
      try {
        const response = await apiRequest(`/applicant/get-cc/${getCookie('id')}`);
        setDeptData(response);
      } catch (err) {
        console.error('Error fetching department info:', err);
      }
    }
    fetchDepartmentInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNewRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setNewRoute((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addAdditionalRoute = () => {
    const newIndex = formData.additionalRoutes.length + 1;
    setFormData((prev) => ({
      ...prev,
      routes: [...prev.additionalRoutes, { ...newRoute, router_index: newIndex }]
    }));
    setNewRoute(initialRoute);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiRequest(`/applicant/create-travel-request/${getCookie('id')}`, {
        method: 'POST',
        data: formData
      });
      alert('Solicitud enviada exitosamente');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un error al enviar la solicitud');
    }
  };

  const handleSaveDraft = async () => {
    try {
      const draftData = {
        router_index: formData.router_index,
        additionalRoutes: formData.additionalRoutes,
      };
      await apiRequest(`/applicant/create-draft-travel-request/${getCookie('id')}`, { method: 'POST', data: draftData });
      console.log('Borrador guardado:', draftData);
      alert('Borrador guardado exitosamente.');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Error al guardar borrador:', err);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
    setIsMultiDestination(false);
  };

  const RouteFormPreview = ({ route, index }) => (
    <div key={index} className="border rounded bg-white p-4 mb-4 shadow">
      <h4 className="font-semibold text-gray-700 mb-2">Ruta #{index + 1}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
        <p><strong>Origen:</strong> {route.origin_city_name}, {route.origin_country_name}</p>
        <p><strong>Destino:</strong> {route.destination_city_name}, {route.destination_country_name}</p>
        <p><strong>Inicio:</strong> {route.beginning_date} {route.beginning_time}</p>
        <p><strong>Fin:</strong> {route.ending_date} {route.ending_time}</p>
        <p><strong>Avión:</strong> {route.plane_needed ? 'Sí' : 'No'}</p>
        <p><strong>Hotel:</strong> {route.hotel_needed ? 'Sí' : 'No'}</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmitRequest} className="space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">País de Origen</label>
            <input name="origin_country_name" placeholder="País Origen" className={inputStyle} value={formData.origin_country_name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad de Origen</label>
            <input name="origin_city_name" placeholder="Ciudad Origen" className={inputStyle} value={formData.origin_city_name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">País de Destino</label>
            <input name="destination_country_name" placeholder="País Destino" className={inputStyle} value={formData.destination_country_name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad de Destino</label>
            <input name="destination_city_name" placeholder="Ciudad Destino" className={inputStyle} value={formData.destination_city_name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
            <input name="beginning_date" type="date" className={inputStyle} value={formData.beginning_date} onChange={handleChange} required />
          </div>  
          <div>
            <label className="block text-sm font-medium mb-1">Hora de Inicio</label>
            <input name="beginning_time" type="time" className={inputStyle} value={formData.beginning_time} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Fin</label>
            <input name="ending_date" type="date" className={inputStyle} value={formData.ending_date} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hora de Fin</label>
            <input name="ending_time" type="time" className={inputStyle} value={formData.ending_time} onChange={handleChange} required />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="plane_needed" checked={formData.plane_needed} onChange={handleChange} />
            ¿Requiere Avión?
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="hotel_needed" checked={formData.hotel_needed} onChange={handleChange} />
            ¿Requiere Hotel?
          </label>
        </div>
      </div>

      {!isMultiDestination && (
        <button
          type="button"
          onClick={() => setIsMultiDestination(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          + Quiero hacer mi viaje multidestino
        </button>
      )}

      {formData.additionalRoutes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Rutas Adicionales</h3>
          {formData.additionalRoutes.map((route, index) => (
            <RouteFormPreview route={route} index={index} key={index} />
          ))}
        </div>
      )}

      {isMultiDestination && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h3 className="font-medium mb-4">Agregar Nueva Ruta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="origin_country_name" placeholder="País Origen" className={inputStyle} value={newRoute.origin_country_name} onChange={handleNewRouteChange} />
            <input name="origin_city_name" placeholder="Ciudad Origen" className={inputStyle} value={newRoute.origin_city_name} onChange={handleNewRouteChange} />
            <input name="destination_country_name" placeholder="País Destino" className={inputStyle} value={newRoute.destination_country_name} onChange={handleNewRouteChange} />
            <input name="destination_city_name" placeholder="Ciudad Destino" className={inputStyle} value={newRoute.destination_city_name} onChange={handleNewRouteChange} />
            <input name="beginning_date" type="date" className={inputStyle} value={newRoute.beginning_date} onChange={handleNewRouteChange} />
            <input name="beginning_time" type="time" className={inputStyle} value={newRoute.beginning_time} onChange={handleNewRouteChange} />
            <input name="ending_date" type="date" className={inputStyle} value={newRoute.ending_date} onChange={handleNewRouteChange} />
            <input name="ending_time" type="time" className={inputStyle} value={newRoute.ending_time} onChange={handleNewRouteChange} />
            <label className="flex gap-2 items-center"><input name="plane_needed" type="checkbox" checked={newRoute.plane_needed} onChange={handleNewRouteChange}/> ¿Requiere Avión?</label>
            <label className="flex gap-2 items-center"><input name="hotel_needed" type="checkbox" checked={newRoute.hotel_needed} onChange={handleNewRouteChange}/> ¿Requiere Hotel?</label>
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={addAdditionalRoute} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              + Agregar Ruta
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Anticipo Esperado (MXN)</label>
          <input name="requested_fee" placeholder="Anticipo Esperado (MXN)" type="number" className={inputStyle} value={formData.requested_fee} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Motivo del Viaje</label>
          <textarea name="notes" rows={4} className="w-full border p-2 rounded-md" value={formData.notes} onChange={handleChange} required></textarea>
        </div>
      </div>
      {deptData && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Centro de Costos</label>
            <input
              type="text"
              value={deptData.costs_center}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Departamento</label>
            <input
              type="text"
              value={deptData.department_name}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>
        </div>
      )}

      <div className="flex flex-row justify-end gap-4 pt-6">
        <button type="button" onClick={handleResetForm} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
          Limpiar Formulario
        </button>
        <button type="button" onClick={handleSaveDraft} className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600">
          Guardar Cambios
        </button>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Enviar Solicitud
        </button>
      </div>
    </form>
  );
}

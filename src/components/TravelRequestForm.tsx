import { useState, useEffect } from 'react';
import { apiRequest } from '@utils/apiClient';
import { getCookie } from '@/data/cookies';
import type { TravelRoute } from '@/types/TravelRoute';
import type { FormData } from '@/types/FormData';
import type { DepartmentData } from '@/types/DepartmentData';
import RouteInputGroup from '@/components/RouteInputGroup';

interface Props {
  data?: FormData;
  isEditable?: boolean;
}

const emptyRoute: TravelRoute = {
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

const initialFormState: FormData = {
  ...emptyRoute,
  notes: '',
  requested_fee: '',
  imposed_fee: 0,
  routes: [{ ...emptyRoute, router_index: 0 }],
};

export default function TravelRequestForm({ data, isEditable }: Props) {
  const [deptData, setDeptData] = useState<DepartmentData | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormState);

  const inputStyle = 'border border-gray-300 p-2 rounded w-full bg-white';
  useEffect(() => {
    if (data) {
      const transformedRoutes = data.routes.map(route => ({
        ...route,
        origin_country_name: route.origin_country,
        origin_city_name: route.origin_city,
        destination_country_name: route.destination_country,
        destination_city_name: route.destination_city,
      }));
      const newData = {
        ...data,
        routes: transformedRoutes,
      };
      setFormData(newData);
    }
  }, [data]);


  console.log('Form Data:', formData);
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

  const handleRouteUpdate = (index: number, name: string, value: any) => {
    setFormData((prev) => {
      const updatedRoutes = prev.routes.map((route, i) => {
        if (i === index) {
          return {
            ...route,
            [name]: value
          };
        }
        return route;
      });
      return { ...prev, routes: updatedRoutes };
    });
  };

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addRoute = () => {
    setFormData((prev) => ({
      ...prev,
      routes: [...prev.routes, { ...emptyRoute, router_index: prev.routes.length }]
    }));
  };

  const removeRoute = (indexToRemove: number) => {
    setFormData((prev) => {
      const filteredRoutes = prev.routes.filter((_, i) => i !== indexToRemove);
      const reindexedRoutes = filteredRoutes.map((route, i) => ({
        ...route,
        router_index: i,
      }));
      return { ...prev, routes: reindexedRoutes };
    });
  };

  const handleUpdateRequest = async () => {
    alert('Solicitud actualizada exitosamente.');
    window.location.href = '/dashboard';
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      router_index: formData.routes[0].router_index,
      notes: formData.notes,
      requested_fee: parseFloat(formData.requested_fee as string) || 0,
      imposed_fee: 0,
      origin_country_name: formData.routes[0].origin_country_name,
      origin_city_name: formData.routes[0].origin_city_name,
      destination_country_name: formData.routes[0].destination_country_name,
      destination_city_name: formData.routes[0].destination_city_name,
      beginning_date: formData.routes[0].beginning_date,
      beginning_time: formData.routes[0].beginning_time,
      ending_date: formData.routes[0].ending_date,
      ending_time: formData.routes[0].ending_time,
      plane_needed: formData.routes[0].plane_needed,
      hotel_needed: formData.routes[0].hotel_needed,
      additionalRoutes: formData.routes.slice(1).map((route, idx) => ({
        ...route,
        router_index: idx + 1
      })),
    };
    console.log('Data to send:', dataToSend);
    try {
      await apiRequest(`/applicant/create-travel-request/${getCookie('id')}`, {
        method: 'POST',
        data: dataToSend
      });
      alert('Solicitud enviada exitosamente');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un error al enviar la solicitud');
    }
  };

  const handleSaveDraft = async () => {
    const draftData = {
    };

    console.log('Draft data to save:', draftData);

    try {
      await apiRequest(`/applicant/create-draft-travel-request/${getCookie('id')}`, { method: 'POST', data: draftData });
      alert('Borrador guardado exitosamente.');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Error al guardar borrador:', err);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmitRequest} className="space-y-8">
      {/*<h2 className="text-xl font-bold mb-6 text-gray-800">Crear una Solicitud de Viaje Completa</h2>*/}

      {/* Render all routes dynamically */}
      {formData.routes.map((route, index) => (
        <RouteInputGroup
          key={route.router_index}
          route={route}
          onChange={handleRouteUpdate}
          index={index}
          onRemove={removeRoute}
          isRemovable={formData.routes.length > 1}
        />
      ))}

      {/* Button to add more routes */}
      <div className="flex justify-start mt-6">
        <button
          type="button"
          onClick={addRoute}
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          + Agregar Ruta a mi Viaje
        </button>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* General Trip Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Detalles Generales del Viaje</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Anticipo Esperado (MXN)</label>
          <input name="requested_fee" placeholder="Anticipo Esperado (MXN)" type="number" className={inputStyle} value={formData.requested_fee} onChange={handleGeneralChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Motivo del Viaje</label>
          <textarea name="notes" rows={4} className="w-full border p-2 rounded-md" value={formData.notes} onChange={handleGeneralChange} required></textarea>
        </div>
      </div>

      {/* Department Info */}
      {deptData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-8">
        <button type="button" onClick={handleResetForm} className="bg-red-500 text-white px-6 py-2 rounded-md shadow hover:bg-red-600 transition-colors">
          Limpiar Formulario
        </button>
        {!isEditable && (
          <div className='flex gap-3'>
            <button type="button" onClick={handleSaveDraft} className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition-colors">
              Guardar Borrador
            </button>
            <button type="button" onClick={handleSubmitRequest} className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700 transition-colors">
              Enviar Solicitud
            </button>
          </div>
        )}
        {isEditable && (
          <button type="button" onClick={handleUpdateRequest} className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-colors">
            Actualizar Solicitud
          </button>
        )}
      </div>
    </form>
  );
}
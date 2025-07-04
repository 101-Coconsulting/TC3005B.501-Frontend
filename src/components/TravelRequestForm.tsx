import { useState, useEffect } from 'react';
import { apiRequest } from '@utils/apiClient';
import type { TravelRoute } from '@/types/TravelRoute';
import type { FormData } from '@/types/FormData';
import type { DepartmentData } from '@/types/DepartmentData';
import RouteInputGroup from '@/components/RouteInputGroup';
import Toast from '@/components/Toast';

interface Props {
  data?: FormData;
  mode: 'create' | 'edit' | 'draft';
  request_id?: string;
  user_id: string;
  role?: string;
  token: string;
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

export default function TravelRequestForm({ data, mode, request_id, user_id, role, token }: Props) {
  const [deptData, setDeptData] = useState<DepartmentData | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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

  useEffect(() => {
    async function fetchDepartmentInfo() {
      try {
        const response = await apiRequest(`/applicant/get-cc/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDeptData(response);
      } catch (err) {
        console.error('Error fetching department info:', err);
      }
    }
    fetchDepartmentInfo();
  }, [user_id, token]);

  const handleRouteUpdate = (index: number, name: string, value: any) => {
    setError(null)
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
    setError(null)
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

  // --- Date and Time Validation Logic ---
  const validateRoutes = (): string | null => {
    const today = new Date();
    // Set today to the start of the day (00:00:00) for accurate date-only comparison
    today.setHours(0, 0, 0, 0); 

    for (const [idx, route] of formData.routes.entries()) {
      // Validate that date strings are not empty before creating Date objects
      if (!route.beginning_date || !route.ending_date) {
        return `Ruta #${idx + 1}: Las fechas de inicio y fin son obligatorias.`;
      }

      const beginningDate = new Date(route.beginning_date);
      const endingDate = new Date(route.ending_date);

      // Check if Date objects are valid (e.g., handles malformed date strings if not caught by input type="date")
      if (isNaN(beginningDate.getTime()) || isNaN(endingDate.getTime())) {
        return `Ruta #${idx + 1}: Formato de fecha inválido. Por favor, utiliza el formato MM/DD/YYYY.`;
      }

      // 1. Check if beginning_date is in the past
      // Compare normalized dates to ignore time component
      const beginningDateOnly = new Date(beginningDate.getFullYear(), beginningDate.getMonth(), beginningDate.getDate());
      if (beginningDateOnly < today) {
        return `Ruta #${idx + 1}: La fecha de inicio (${route.beginning_date}) no puede ser una fecha pasada.`;
      }

      // 2. Check if ending_date is before beginning_date
      // Compare normalized dates for initial check
      const endingDateOnly = new Date(endingDate.getFullYear(), endingDate.getMonth(), endingDate.getDate());
      if (endingDateOnly < beginningDateOnly) {
        return `Ruta #${idx + 1}: La fecha de fin (${route.ending_date}) debe ser igual o posterior a la fecha de inicio (${route.beginning_date}).`;
      }
      
      // 3. If dates are the same, check times
      if (endingDateOnly.getTime() === beginningDateOnly.getTime()) {
        if (!route.beginning_time || !route.ending_time) {
          return `Ruta #${idx + 1}: Las horas de inicio y fin son obligatorias cuando las fechas son las mismas.`;
        }

        // Parse hours and minutes
        const [bh, bm] = route.beginning_time.split(':').map(Number);
        const [eh, em] = route.ending_time.split(':').map(Number);
        
        const beginningMinutes = bh * 60 + bm;
        const endingMinutes = eh * 60 + em;

        if (endingMinutes <= beginningMinutes) { // Use <= to enforce "posterior" (strictly after)
          return `Ruta #${idx + 1}: La hora de fin (${route.ending_time}) debe ser posterior a la hora de inicio (${route.beginning_time}) cuando las fechas son las mismas.`;
        }
      }
    }
    return null; // No errors found
  };
  // --- End Date and Time Validation Logic ---

  const handleSetToast = (message: string, type: 'success' | 'error', duration: number = 2000) => {
    setDisabledButton(true)
    setToast({ message, type });
    //setTimeout(() => setError(null), duration);
    setTimeout(() => {
      setToast(null);
      setDisabledButton(false);
    }, duration);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const routeError = validateRoutes();
    if (routeError) {
      setError(routeError);
      handleSetToast('Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.', 'error');
      return;
    }

    const firstRoute = formData.routes[0];
    if (
      !firstRoute.origin_country_name ||
      !firstRoute.origin_city_name ||
      !firstRoute.destination_country_name ||
      !firstRoute.destination_city_name ||
      !firstRoute.beginning_date ||
      !firstRoute.beginning_time ||
      !firstRoute.ending_date ||
      !firstRoute.ending_time ||
      !formData.requested_fee ||
      !formData.notes
    ) {
      setError('Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.');
      handleSetToast('Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.', 'error');
      return;
    }

    setError(null);

    const dataToSend = {
      router_index: firstRoute.router_index,
      notes: formData.notes,
      requested_fee: parseFloat(formData.requested_fee as string) || 0,
      imposed_fee: 0,
      origin_country_name: firstRoute.origin_country_name,
      origin_city_name: firstRoute.origin_city_name,
      destination_country_name: firstRoute.destination_country_name,
      destination_city_name: firstRoute.destination_city_name,
      beginning_date: firstRoute.beginning_date,
      beginning_time: firstRoute.beginning_time,
      ending_date: firstRoute.ending_date,
      ending_time: firstRoute.ending_time,
      plane_needed: firstRoute.plane_needed,
      hotel_needed: firstRoute.hotel_needed,
      additionalRoutes: formData.routes.slice(1).map((route, idx) => ({
      ...route,
      router_index: idx + 1
      })),
    };
    try {
      await apiRequest(`/applicant/create-travel-request/${user_id}`, {
        method: 'POST',
        data: dataToSend,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setToast({ message: 'Solicitud creada y enviada exitosamente.', type: 'success' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (role === "Solicitante") {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/solicitudes-autorizador';
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError('Hubo un error al enviar la solicitud.');
      setToast({ message: 'Hubo un error al enviar la solicitud.', type: 'error' });
    }
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();

    const routeError = validateRoutes();
    if (routeError) {
      handleSetToast(routeError + " Los campos válidos se guardarán en el borrador.", 'error', 4000);
    }

    const firstRoute = formData.routes[0] || {};
    const draftData: Record<string, any> = {};

    if (firstRoute.router_index !== undefined) draftData.router_index = firstRoute.router_index;
    if (formData.notes) draftData.notes = formData.notes;
    if (formData.requested_fee) draftData.requested_fee = parseFloat(formData.requested_fee as string) || 0;
    draftData.imposed_fee = 0; // Always send imposed_fee as 0

    if (firstRoute.origin_country_name) draftData.origin_country_name = firstRoute.origin_country_name;
    if (firstRoute.origin_city_name) draftData.origin_city_name = firstRoute.origin_city_name;
    if (firstRoute.destination_country_name) draftData.destination_country_name = firstRoute.destination_country_name;
    if (firstRoute.destination_city_name) draftData.destination_city_name = firstRoute.destination_city_name;
    if (firstRoute.beginning_date) draftData.beginning_date = firstRoute.beginning_date;
    if (firstRoute.beginning_time) draftData.beginning_time = firstRoute.beginning_time;
    if (firstRoute.ending_date) draftData.ending_date = firstRoute.ending_date;
    if (firstRoute.ending_time) draftData.ending_time = firstRoute.ending_time;
    if (firstRoute.plane_needed) draftData.plane_needed = firstRoute.plane_needed;
    if (firstRoute.hotel_needed) draftData.hotel_needed = firstRoute.hotel_needed;

    const additionalRoutes = formData.routes.slice(1)
      .map((route, idx) => ({
      ...route,
      router_index: idx + 1
      }))
      .filter(route =>
      route.origin_country_name ||
      route.origin_city_name ||
      route.destination_country_name ||
      route.destination_city_name ||
      route.beginning_date ||
      route.beginning_time ||
      route.ending_date ||
      route.ending_time ||
      route.plane_needed ||
      route.hotel_needed
      );

    if (additionalRoutes.length > 0) {
      draftData.additionalRoutes = additionalRoutes;
    } else {
      draftData.additionalRoutes = [];
    }

    try {
      await apiRequest(`/applicant/create-draft-travel-request/${user_id}`, {
        method: 'POST',
        data: draftData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleSetToast('Borrador guardado exitosamente.', 'success');
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = '/solicitudes-draft';
    } catch (err) {
      console.error('Error al guardar borrador:', err);
      setError('Hubo un error al guardar el borrador.');
      handleSetToast('Hubo un error al guardar el borrador. Por favor, inténtalo de nuevo.', 'error');
    }
  };

  const handleEditRequest = async (
    e: React.FormEvent,
    completeForm: boolean,
    href_route?: string
  ): Promise<boolean> => {
    e.preventDefault();

    if (completeForm) {
      const routeError = validateRoutes();
      if (routeError) {
        setError(routeError);
        handleSetToast("Hubo un error al editar la solicitud. Por favor, inténtalo de nuevo.", 'error');
        return false;
      }

      const firstRoute = formData.routes[0];
      const missingFields = [
        firstRoute.origin_country_name,
        firstRoute.origin_city_name,
        firstRoute.destination_country_name,
        firstRoute.destination_city_name,
        firstRoute.beginning_date,
        firstRoute.beginning_time,
        firstRoute.ending_date,
        firstRoute.ending_time,
        formData.requested_fee,
        formData.notes,
      ].some(field => !field);

      if (missingFields) {
        setError('Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.');
        handleSetToast('Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.', 'error');
        return false;
      }
    } else {
      const routeError = validateRoutes();
      if (routeError) {
        handleSetToast(routeError + " Los cambios se guardarán, pero los campos de fecha/hora inválidos deberán corregirse para enviar la solicitud.", 'error', 5000);
      }
    }

    setError(null);

    let editedData: Record<string, any> = {};
    const firstRoute = formData.routes[0];

    const includeIfExists = (key: string, value: any) => {
      if (value !== undefined && value !== '' && value !== null) { // Add null check for robustness
        editedData[key] = value;
      }
    };

    includeIfExists('router_index', firstRoute.router_index);
    editedData.notes = typeof formData.notes === 'string' ? formData.notes.trim() : '';
    includeIfExists('requested_fee', parseFloat(formData.requested_fee as string));
    editedData.imposed_fee = 0;
    includeIfExists('origin_country_name', firstRoute.origin_country_name);
    includeIfExists('origin_city_name', firstRoute.origin_city_name);
    includeIfExists('destination_country_name', firstRoute.destination_country_name);
    includeIfExists('destination_city_name', firstRoute.destination_city_name);
    includeIfExists('beginning_date', firstRoute.beginning_date);
    includeIfExists('beginning_time', firstRoute.beginning_time);
    includeIfExists('ending_date', firstRoute.ending_date);
    includeIfExists('ending_time', firstRoute.ending_time);
    editedData.plane_needed = firstRoute.plane_needed;
    editedData.hotel_needed = firstRoute.hotel_needed;

    const additionalRoutes = formData.routes
      .slice(1)
      .map((route, idx) => ({
        ...route,
        router_index: idx + 1,
      }))
      .filter(route =>
        route.origin_country_name ||
        route.origin_city_name ||
        route.destination_country_name ||
        route.destination_city_name ||
        route.beginning_date ||
        route.beginning_time ||
        route.ending_date ||
        route.ending_time ||
        route.plane_needed ||
        route.hotel_needed
      );

    if (additionalRoutes.length > 0) {
      editedData.additionalRoutes = additionalRoutes;
    } else {
      editedData.additionalRoutes = [];
    }

    try {
      await apiRequest(`/applicant/edit-travel-request/${request_id}`, {
        method: 'PUT',
        data: editedData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (href_route) {
        setToast({ message: 'Cambios guardados exitosamente.', type: 'success' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = href_route;
      }
      return true;
    } catch (err) {
      console.error('Error al editar la solicitud:', err);
      setError('Hubo un error al editar la solicitud. Por favor, inténtalo de nuevo.');
      handleSetToast('Hubo un error al editar la solicitud. Por favor, inténtalo de nuevo.', 'error');
      return false;
    }
  };

    const handleFinishDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const routeError = validateRoutes();
    if (routeError) {
      setError(routeError);
      handleSetToast("Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.", 'error');
      return;
    }

    const firstRoute = formData.routes[0];
    if (
      !firstRoute.origin_country_name ||
      !firstRoute.origin_city_name ||
      !firstRoute.destination_country_name ||
      !firstRoute.destination_city_name ||
      !firstRoute.beginning_date ||
      !firstRoute.beginning_time ||
      !firstRoute.ending_date ||
      !firstRoute.ending_time ||
      !formData.requested_fee ||
      !formData.notes
    ) {
      setError('Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.');
      handleSetToast('Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.', 'error');
      return;
    }

    const editSuccess = await handleEditRequest(e, true);
    if (!editSuccess) return;

    try {
      await apiRequest(`/applicant/confirm-draft-travel-request/${user_id}/${request_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleSetToast('Borrador completado exitosamente.', 'success');
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = '/solicitudes-draft';
    } catch (err) {
      console.error('Error al completar el borrador:', err);
      setError('Hubo un error al completar el borrador. Por favor, inténtalo de nuevo.');
      handleSetToast('Hubo un error al completar el borrador. Por favor, inténtalo de nuevo.', 'error');
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
    setError(null);
    setToast(null);
  };

  return (
    <form onSubmit={handleSubmitRequest} className="space-y-8">
      {/* Nota de campos obligatorios */}
      <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded shadow-sm mb-4">
        <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
        </svg>
        <p className="text-sm text-blue-900 font-medium">
          Los campos obligatorios están marcados con un asterisco.
        </p>
      </div>

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
          <label className="block text-sm font-medium mb-1">Anticipo Esperado (MXN)<span className="text-red-500"> *</span></label>
          <input name="requested_fee" placeholder="Anticipo Esperado (MXN)" type="number" className={inputStyle} value={formData.requested_fee === 0 ? '' : formData.requested_fee} onChange={handleGeneralChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Observaciones / Comentarios<span className="text-red-500"> *</span></label>
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

      {/* Mensaje de Error */}
      { error && (
        <div className="bg-red-200 text-red-800 p-4 rounded-md">
          <p className="text-sm">{error}</p>
        </div>
      )}
      {mode === 'draft' && !error && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
          <p className="text-sm">Estás editando un borrador. Asegúrate de completar todos los campos antes de enviar.</p>
        </div>
      )}
      {mode === 'edit' && !error && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
          <p className="text-sm">Estás editando una solicitud existente. Asegúrate de revisar todos los campos antes de actualizar.</p>
        </div>
      )}
      {mode === 'create' && !error && (
        <div className="bg-blue-100 text-blue-800 p-4 rounded-md">
          <p className="text-sm">Estás creando una nueva solicitud de viaje. Completa todos los campos requeridos.</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button type="button" onClick={handleResetForm} className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-red-500 text-white px-6 py-2 rounded-md shadow hover:bg-red-600 transition-colors"
          disabled={disabledButton}
        >
          Limpiar Formulario
        </button>
        {mode == 'create' && (
          <div className='flex gap-3'>
            <button type="button" onClick={handleSaveDraft} className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition-colors"
              disabled={disabledButton}
            >
              Guardar Borrador
            </button>
            <button type="button" onClick={handleSubmitRequest} className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700 transition-colors"
              disabled={disabledButton}
            >
              Enviar Solicitud
            </button>
          </div>
        )}
        {mode == 'edit' && (
          <button type="button"
            onClick={async (e) => {
              await handleEditRequest(e as unknown as React.FormEvent, true, '/dashboard');
            }}
            className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
            disabled={disabledButton}
          >
            Actualizar Solicitud
          </button>
        )}
        {mode == 'draft' && (
          <div className='flex gap-3'>
            <button type="button"
              onClick={async (e) => {
                await handleEditRequest(e as unknown as React.FormEvent, false, '/solicitudes-draft');
              }}
              className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition-colors"
              disabled={disabledButton}
            >
              Guardar Cambios
            </button>
            <button type="button" onClick={handleFinishDraft} className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700 transition-colors"
              disabled={disabledButton}
            >
              Enviar Solicitud
            </button>
          </div>
        )}
        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </form>
  );
}
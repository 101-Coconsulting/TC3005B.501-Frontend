import { useState } from 'react';
import { apiRequest } from '@utils/apiClient';
import { getCookie } from '@/data/cookies';

export default function CreateTravelRequestForm() {
  const initialForm = {
    origin_country_name: '',
    origin_city_name: '',
    destination_country_name: '',
    destination_city_name: '',
    beginning_date: '',
    beginning_time: '',
    ending_date: '',
    ending_time: '',
    requested_fee: '',
    imposed_fee: '',
    notes: '',
    plane_needed: false,
    hotel_needed: false,
    additionalRoutes: []
  };

  const initialRoute = {
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

  const [formData, setFormData] = useState(initialForm);
  const [newRoute, setNewRoute] = useState(initialRoute);
  const [isMultiDestination, setIsMultiDestination] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNewRouteChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoute((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addAdditionalRoute = () => {
    setFormData((prev) => ({
      ...prev,
      additionalRoutes: [
        ...prev.additionalRoutes,
        { ...newRoute, router_index: prev.additionalRoutes.length + 1 }
      ]
    }));
    setNewRoute(initialRoute);
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    const mainRoute = {
      router_index: 0,
      origin_country_name: formData.origin_country_name,
      origin_city_name: formData.origin_city_name,
      destination_country_name: formData.destination_country_name,
      destination_city_name: formData.destination_city_name,
      beginning_date: formData.beginning_date,
      beginning_time: formData.beginning_time,
      ending_date: formData.ending_date,
      ending_time: formData.ending_time,
      plane_needed: formData.plane_needed,
      hotel_needed: formData.hotel_needed
    };

    const payload = {
      notes: formData.notes,
      requested_fee: parseFloat(formData.requested_fee),
      imposed_fee: 0,
      routes: [mainRoute, ...formData.additionalRoutes]
    };

    try {
      await apiRequest(`/applicant/create-travel-request/${getCookie("id")}`, {
        method: 'POST',
        data: { payload }
      });
      alert('Solicitud enviada exitosamente');
    } catch (error) {
      console.log(payload)
      console.error('Error al enviar la solicitud:', error);
      alert('Solicitud enviada exitosamente');
      window.location.reload();
    }
  };

  const handleSaveChanges = () => {
    alert('Cambios guardados localmente');
  };

  const handleResetForm = () => {
    setFormData(initialForm);
    setNewRoute(initialRoute);
    setIsMultiDestination(false);
  };

  const inputStyle = 'border border-gray-300 p-2 rounded w-full bg-white';

  const RouteFormPreview = ({ route, index }) => (
    <div key={index} className="border rounded bg-white p-4 mb-4">
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
      {/* Datos de ruta principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="origin_country_name" placeholder="País de Origen" className={inputStyle} value={formData.origin_country_name} onChange={handleChange} required />
        <input name="origin_city_name" placeholder="Ciudad de Origen" className={inputStyle} value={formData.origin_city_name} onChange={handleChange} required />
        <input name="destination_country_name" placeholder="País Destino" className={inputStyle} value={formData.destination_country_name} onChange={handleChange} required />
        <input name="destination_city_name" placeholder="Ciudad Destino" className={inputStyle} value={formData.destination_city_name} onChange={handleChange} required />
        <input name="beginning_date" type="date" className={inputStyle} value={formData.beginning_date} onChange={handleChange} required />
        <input name="beginning_time" type="time" className={inputStyle} value={formData.beginning_time} onChange={handleChange} required />
        <input name="ending_date" type="date" className={inputStyle} value={formData.ending_date} onChange={handleChange} required />
        <input name="ending_time" type="time" className={inputStyle} value={formData.ending_time} onChange={handleChange} required />
        <input name="requested_fee" placeholder="Anticipo Esperado (MXN)" type="number" step="0.01" className={inputStyle} value={formData.requested_fee} onChange={handleChange} required />
        <div className="col-span-2 flex gap-6 items-center">
          <label className="flex gap-2 items-center">
            <input name="plane_needed" type="checkbox" checked={formData.plane_needed} onChange={handleChange} />
            ¿Requiere Avión?
          </label>
          <label className="flex gap-2 items-center">
            <input name="hotel_needed" type="checkbox" checked={formData.hotel_needed} onChange={handleChange} />
            ¿Requiere Hotel?
          </label>
        </div>
      </div>

      {/* Notas */}
      <div>
        <label className="block text-sm font-semibold mb-1">Motivo del viaje</label>
        <textarea name="notes" rows={4} className="w-full border p-2 rounded-md" value={formData.notes} onChange={handleChange} required></textarea>
      </div>

      {/* Activar modo multidestino */}
      {!isMultiDestination && (
        <button
          type="button"
          onClick={() => setIsMultiDestination(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600"
        >
          + Quiero hacer mi viaje multidestino
        </button>
      )}

      {/* Rutas adicionales guardadas */}
      {formData.additionalRoutes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Rutas adicionales registradas</h3>
          {formData.additionalRoutes.map((route, index) => (
            <RouteFormPreview route={route} index={index} key={index} />
          ))}
        </div>
      )}

      {/* Nueva ruta adicional */}
      {isMultiDestination && (
        <div className="border bg-gray-50 border-none rounded p-4 mt-4">
          <h3 className="font-medium mb-2">Agregar Nueva Ruta Adicional</h3>
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
          <div className="flex flex-row justify-end mt-6">
            <button type="button" onClick={addAdditionalRoute} className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600">
              + Agregar Ruta Adicional
            </button>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-row justify-end gap-4">
        <button type="button" onClick={handleResetForm} className="bg-red-500 text-white px-6 py-2 rounded-md shadow hover:bg-red-600">
          Limpiar Formulario
        </button>
        <button type="button" onClick={handleSaveChanges} className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600">
          Guardar Cambios
        </button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700">
          Enviar Solicitud
        </button>
      </div>
    </form>
  );
}

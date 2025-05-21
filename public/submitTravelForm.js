// public/submitTravelForm.js
import { apiRequest } from '/src/utils/apiClient.ts';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('travelForm');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userId = form.dataset.userId;
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('border-warning-400');
        isValid = false;
      } else {
        field.classList.remove('border-warning-400');
      }
    });

    if (!isValid) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const additionalDestinations = [];
    document.querySelectorAll('[name="destinosAdicionales"]').forEach(input => {
      if (input.value.trim()) {
        const [city, country] = input.value.split(',').map(s => s.trim());
        additionalDestinations.push({
          router_index: additionalDestinations.length + 2,
          origin_country_name: data.paísDestino,
          origin_city_name: data.ciudadDestino,
          destination_country_name: country,
          destination_city_name: city,
          beginning_date: data.fechaInicio,
          beginning_time: data.horaInicio || null,
          ending_date: data.fechaFin,
          ending_time: data.horaFin || null,
          plane_needed: true,
          hotel_needed: true,
        });
      }
    });

    const payload = {
      router_index: 1,
      origin_country_name: data.paísOrigen,
      origin_city_name: data.ciudadOrigen,
      destination_country_name: data.paísDestino,
      destination_city_name: data.ciudadDestino,
      beginning_date: data.fechaInicio,
      beginning_time: data.horaInicio || null,
      ending_date: data.fechaFin,
      ending_time: data.horaFin || null,
      plane_needed: true,
      hotel_needed: true,
      requested_fee: parseFloat(data.anticipoEsperado),
      notes: data.motivo,
      additionalRoutes: additionalDestinations,
    };

    try {
      await apiRequest(`/applicant/create-travel-request/${userId}`, {
        method: 'POST',
        data: payload,
      });

      alert('Solicitud enviada correctamente');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      alert('Error al enviar la solicitud: ' + error.message);
    }
  });
});

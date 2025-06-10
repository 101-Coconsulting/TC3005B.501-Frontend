/*
* Author: Nicole Dávila Hernández and Julia Maria Stephanie Duenkelsbuehler Castillo 
* This component handles both creating and editing users.
* It uses a single form that adapts based on the mode (create/edit).
*/

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@utils/apiClient'; // Adjust the import path as needed
interface CreateUserProps {
  mode: 'create' | 'edit';
  // For edit mode, userId is required
  userId?: string;
  // For edit mode, optionally pass initial data
  initialData?: Partial<{
    user_name: string;
    email: string;
    phone_number: string;
    workstation: string;
    role_name: string;
    department_name: string;
  }>;
}

const initialCreateState = {
  role_id: '',
  department_id: '',
  user_name: '',
  password: '',
  workstation: '',
  email: '',
  phone_number: '',
};

const initialEditState = {
  user_name: '',
  email: '',
  phone_number: '',
  workstation: '',
  role_name: '',
  department_name: '',
};

const inputStyle = 'border border-gray-300 p-2 rounded w-full bg-white';

const CreateUsers: React.FC<CreateUserProps> = ({ mode, userId, initialData }) => {
  const [formData, setFormData] = useState<any>(mode === 'create' ? initialCreateState : initialEditState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({ ...initialEditState, ...initialData });
    }
  }, [mode, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (mode === 'create') {
      try {
        await apiRequest('/admin/create-user', {
          method: 'POST',
          data: { payload: formData }
        });
      } catch (err: any) {
        setError(err.message || 'Error creando usuario');
      }
        setSuccess('Usuario creado exitosamente.');
        setTimeout(() => (window.location.href = '/dashboard'), 1500);
    } else if (mode === 'edit' && userId) {
      try {
        await apiRequest(`/admin/update-user/${userId}`, {
          method: 'PUT',
          data: { payload: formData }
        });
      } catch (err: any) {
        setError(err.message || 'Error actualizando usuario');
      }
        setSuccess('Usuario actualizado exitosamente.');
        setTimeout(() => (window.location.href = '/dashboard'), 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Common fields */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Nombre Completo</label>
          <input
            className={inputStyle}
            name="user_name"
            type="text"
            required
            value={formData.user_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Correo Electrónico</label>
          <input
            className={inputStyle}
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Teléfono</label>
          <input
            className={inputStyle}
            name="phone_number"
            type="tel"
            required
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Workstation</label>
          <input
            className={inputStyle}
            name="workstation"
            type="text"
            required
            value={formData.workstation}
            onChange={handleChange}
          />
        </div>
        {mode === 'create' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-black">Contraseña</label>
              <input
                className={inputStyle}
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black">ID de Rol</label>
              <input
                className={inputStyle}
                name="role_id"
                type="text"
                required
                value={formData.role_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black">ID de Departamento</label>
              <input
                className={inputStyle}
                name="department_id"
                type="text"
                required
                value={formData.department_id}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {mode === 'edit' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-black">Rol</label>
              <input
                className={inputStyle}
                name="role_name"
                type="text"
                required
                value={formData.role_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black">Departamento</label>
              <input
                className={inputStyle}
                name="department_name"
                type="text"
                required
                value={formData.department_name}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <div className="flex justify-end gap-4 pt-4">
        <button type="reset" className="px-4 py-2 border rounded text-gray-700">Limpiar</button>
        <button type="submit" className="px-4 py-2 bg-primary-400 text-white rounded">
          {mode === 'create' ? 'Crear Usuario' : 'Actualizar Usuario'}
        </button>
      </div>
    </form>
  );
};

export default CreateUsers;

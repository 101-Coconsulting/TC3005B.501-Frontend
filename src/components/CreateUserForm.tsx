/**
 * Author: Michael devlyn 
 * 
 * Description: React component for creating new users in the admin panel.
 */

import React, { useState } from 'react';
import Button from '@components/Button';
import { apiRequest } from '@utils/apiClient';
import Toast from '@components/Toast';

interface FormData {
  role_id: number | '';
  department_id: number | '';
  user_name: string;
  password: string;
  workstation: string;
  email: string;
  phone_number: string;
}

interface FormErrors {
  [key: string]: string;
}

const roles = [
  { id: 1, name: 'Solicitante' },
  { id: 2, name: 'Agencia de viajes' },
  { id: 3, name: 'Cuentas por pagar' },
  { id: 4, name: 'N1' },
  { id: 5, name: 'N2' },
  { id: 6, name: 'Administrador' }
];

const departments = [
  { id: 1, name: 'Finanzas' },
  { id: 2, name: 'Recursos Humanos' },
  { id: 3, name: 'IT' },
  { id: 4, name: 'Marketing' },
  { id: 5, name: 'Operaciones' }
];

const initialFormData: FormData = {
  role_id: '',
  department_id: '',
  user_name: '',
  password: '',
  workstation: '',
  email: '',
  phone_number: ''
};

export default function CreateUserForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'El nombre de usuario es requerido';
    } else if (formData.user_name.includes(' ')) {
      newErrors.user_name = 'El nombre de usuario no puede contener espacios';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.includes(' ')) {
      newErrors.password = 'La contraseña no puede contener espacios';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email debe tener un formato válido';
    }

    if (!formData.workstation.trim()) {
      newErrors.workstation = 'La estación de trabajo es requerida';
    }

    if (!formData.role_id) {
      newErrors.role_id = 'El rol es requerido';
    }

    if (!formData.department_id) {
      newErrors.department_id = 'El departamento es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role_id' || name === 'department_id' ? 
        (value === '' ? '' : parseInt(value)) : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToast({ message: 'Por favor corrige los errores en el formulario', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await apiRequest('/admin/create-user', {
        method: 'POST',
        data: formData
      });

      console.log('User creation response:', response);
      
      // Clear any previous toast
      setToast(null);
      
      // Show success message
      setTimeout(() => {
        setToast({ message: 'Usuario creado exitosamente', type: 'success' });
      }, 100);
      
      // Reset form
      setFormData(initialFormData);
      setErrors({});
      
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      // Clear any previous toast
      setToast(null);
      
      // Handle backend validation errors
      if (error.message.includes('errors')) {
        try {
          const errorData = JSON.parse(error.message.split(': ')[1]);
          if (errorData.errors) {
            const backendErrors: FormErrors = {};
            errorData.errors.forEach((err: any) => {
              backendErrors[err.param] = err.msg;
            });
            setErrors(backendErrors);
            setToast({ message: 'Por favor corrige los errores marcados', type: 'error' });
          }
        } catch (parseError) {
          setToast({ message: 'Error al crear el usuario', type: 'error' });
        }
      } else if (error.message.includes('Internal server error')) {
        setToast({ message: 'Error interno del servidor', type: 'error' });
      } else if (error.message.includes('User created succesfully')) {
        // Handle case where backend sends success but frontend thinks it's an error
        setToast({ message: 'Usuario creado exitosamente', type: 'success' });
        setFormData(initialFormData);
        setErrors({});
      } else {
        setToast({ message: 'Error al crear el usuario', type: 'error' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setToast(null);
  };

  const inputClass = (fieldName: string) => 
    `w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 ${
      errors[fieldName] ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Nuevo Usuario</h2>
        <p className="text-gray-600">Complete todos los campos para crear un nuevo usuario en el sistema</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Usuario y Contraseña */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de Usuario <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleInputChange}
              className={inputClass('user_name')}
              placeholder="Ej: juan.perez"
            />
            {errors.user_name && (
              <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={inputClass('password')}
              placeholder="Contraseña segura"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Email y Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClass('email')}
              placeholder="usuario@empresa.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Teléfono <span className="text-gray-400">(opcional)</span>
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className={inputClass('phone_number')}
              placeholder="555-1234"
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
            )}
          </div>
        </div>

        {/* Estación de Trabajo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estación de Trabajo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="workstation"
            value={formData.workstation}
            onChange={handleInputChange}
            className={inputClass('workstation')}
            placeholder="Ej: WS-001"
          />
          {errors.workstation && (
            <p className="text-red-500 text-sm mt-1">{errors.workstation}</p>
          )}
        </div>

        {/* Rol y Departamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol <span className="text-red-500">*</span>
            </label>
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleInputChange}
              className={inputClass('role_id')}
            >
              <option value="">Seleccionar rol</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="text-red-500 text-sm mt-1">{errors.role_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento <span className="text-red-500">*</span>
            </label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              className={inputClass('department_id')}
            >
              <option value="">Seleccionar departamento</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department_id && (
              <p className="text-red-500 text-sm mt-1">{errors.department_id}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={handleReset}
            variant="border"
            color="secondary"
            disabled={isSubmitting}
          >
            Limpiar Formulario
          </Button>
          
          <Button
            type="submit"
            variant="filled"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creando Usuario...' : 'Crear Usuario'}
          </Button>
        </div>
      </form>

      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast 
            message={toast.message} 
            type={toast.type}
            duration={toast.type === 'success' ? 4000 : 6000}
          />
        </div>
      )}
    </div>
  );
}
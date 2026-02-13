import { useState, useCallback } from "react";
import { apiRequest } from "@utils/apiClient";
import ModalWrapper from "@components/ModalWrapper";
import Toast from '@components/Toast';

interface Props {
  request_id: string;
  token: string;
}

export default function AssignBudget({ request_id, token }: Props) {
  const [imposedFee, setImposedFee] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleConfirm = useCallback(async () => {
    const parsedFee = parseFloat(imposedFee);

    if (!imposedFee || isNaN(parsedFee) || parsedFee <= 0) {
      setErrorMessage("Por favor ingrese un monto válido mayor a 0.");
      return;
    }

    setErrorMessage("");

    try {
      const url = `/api/accounts-payable/attend-travel-request/${request_id}`;
      await apiRequest(url, {
        method: "PUT",
        data: {
          imposed_fee: parsedFee,
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setToast({ message: 'Presupuesto asignado exitosamente.', type: 'success' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error al asignar presupuesto:", error);
      alert("Ocurrió un error al enviar la información.");
    }
  }, [imposedFee, request_id]);

  return (
    <div className="w-full p-6 bg-white rounded border border-gray-300">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">
        Asignar presupuesto a la solicitud de viaje
      </h1>
      <p className="mb-4 text-gray-600">
        Una vez que haya revisado todos los datos del viaje, por favor asigne un
        monto presupuestal para cubrir los gastos.
      </p>

      <div className="mb-6">
        <label htmlFor="imposedFee" className="block text-sm font-medium text-gray-700 mb-1">
          Presupuesto impuesto (MXN)
        </label>
        <input
          type="number"
          id="imposedFee"
          value={imposedFee}
          onChange={(e) => setImposedFee(e.target.value)}
          placeholder="Ingrese el monto presupuestal"
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-4 rounded-md mt-4">
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <ModalWrapper
          title="¿Estás seguro de asignar este presupuesto?"
          message="Una vez asignado, la solicitud no podrá ser modificada."
          button_type="primary"
          modal_type="success"
          onConfirm={handleConfirm}
          variant="filled"
        >
          Asignar presupuesto
        </ModalWrapper>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

import { apiRequest } from "@utils/apiClient";

const receiptTypeMap: Record<string, number> = {
  "Autobús": 5,
  "Caseta": 4,
  "Comida": 2,
  "Hospedaje": 1,
  "Otro": 7,
  "Transporte": 3,
  "Vuelo": 6,
};

interface SubmitExpenseParams {
  requestId: number;
  concepto: string;
  monto: number;
}

export async function submitTravelExpense({
  requestId,
  concepto,
  monto,
}: SubmitExpenseParams) {
  const receipt_type_id = receiptTypeMap[concepto];
  if (!receipt_type_id) throw new Error(`Concepto inválido: ${concepto}`);

  const payload = {
    receipts: [
      {
        receipt_type_id,
        request_id: requestId,
        amount: monto,
      },
    ],
  };

  return await apiRequest("/applicant/create-expense-validation", {
    method: "POST",
    data: payload,
  });
}

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
  token: string;
}

export async function submitTravelExpense({
  requestId,
  concepto,
  monto,
  token,
}: SubmitExpenseParams): Promise<{ count: number; lastReceiptId: number | null }> {
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

  await apiRequest("/api/applicant/create-expense-validation", {
    method: "POST",
    data: payload,
    headers: { Authorization: `Bearer ${token}` }
  });

  // Espera un momento dice mike
  await new Promise((res) => setTimeout(res, 500));

  const res = await apiRequest(`/api/accounts-payable/get-expense-validations/${requestId}`, { 
    method: "GET",
    headers: { Authorization: `Bearer ${token}` } 
  });

  const expenses = res.Expenses ?? [];
  const count = expenses.length;

  expenses.sort((a, b) => b.receipt_id - a.receipt_id);
  const lastReceiptId = count > 0 ? expenses[0].receipt_id : null;

  //alert(`Comprobante enviado exitosamente.`);

  return { count, lastReceiptId };
}

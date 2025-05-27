import React, { useState } from "react";
import UploadFiles from "@components/UploadFiles";
import Button from "@components/Button.tsx";
import { submitTravelExpense } from "@components/SubmitTravelWarper";

interface Props {
  requestId: number;
}

export default function ExpensesFormClient({ requestId }: Props) {
  const [concepto, setConcepto] = useState("Transporte");
  const [monto, setMonto] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [xmlFile, setXmlFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitTravelExpense({
        requestId,
        concepto,
        monto: parseFloat(monto),
      });
      alert("Comprobación enviada correctamente");
      window.location.href = `/comprobar-solicitud/${requestId}`;
    } catch (err) {
      console.error(err);
      alert("Error al enviar la comprobación");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium">Concepto</label>
          <select
            name="concepto"
            className="w-full border rounded-md px-3 py-2"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
          >
            <option>Transporte</option>
            <option>Hospedaje</option>
            <option>Comida</option>
            <option>Caseta</option>
            <option>Autobús</option>
            <option>Vuelo</option>
            <option>Otro</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Monto</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-md px-3 py-2"
            placeholder="Ej. 443.50"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>
      </div>

      <UploadFiles onPdfChange={setPdfFile} onXmlChange={setXmlFile} />

      <div className="flex justify-end gap-4 pt-4">
        <a href={`/comprobar-solicitud/${requestId}`}>
          <Button type="button" variant="border" color="warning">
            Cancelar
          </Button>
        </a>
        <Button type="submit" variant="filled" color="primary">
          Enviar Comprobación
        </Button>
      </div>
    </form>
  );
}

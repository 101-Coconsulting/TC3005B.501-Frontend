import { useEffect } from "react";
const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

interface Props {
  receiptId: number;
  pdfFile: File | null;
  xmlFile: File | null;
  token: string;
  onDone: () => void;
  onError: (err: Error) => void;
  receiptToReplace?: string | null;
}

export default function UploadReceiptFiles({
  receiptId,
  pdfFile,
  xmlFile,
  token,
  receiptToReplace,
  onDone,
  onError,
}: Props) {
  useEffect(() => {
  if (!pdfFile && !xmlFile) return;

  const upload = async () => {
    try {
      const formData = new FormData();
      if (pdfFile) formData.append("pdf", pdfFile);
      if (xmlFile) formData.append("xml", xmlFile);

      const response = await fetch (`${API_BASE_URL}/files/upload-receipt-files/${receiptId}`, {
        method: "POST",
        body: formData,
        headers: {
                Authorization: `Bearer ${token}`
              }
      });

      if (!response.ok) throw new Error("Error al subir los archivos");
        //alert("receiptToReplace recibido: " + receiptToReplace);


        if (receiptToReplace) {
          //alert("Intentando DELETE a: " + `${API_BASE_URL}/files/delete-receipt/${receiptToReplace}`);


          try {
            const delRes = await fetch(`${API_BASE_URL}/applicant/delete-receipt/${receiptToReplace}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!delRes.ok) {
              const text = await delRes.text();
              console.error("Error en DELETE:", delRes.status, text);
            } else {
              console.log("Recibo actualizado correctamente.");
            }
          } catch (delErr) {
            console.error("Error eliminando comprobante anterior:", delErr);
          }
        }

onDone();
    } catch (err) {
      onError(err as Error);
    }
  };

  upload();
}, [receiptId, pdfFile, xmlFile, receiptToReplace]);

  return null;
}

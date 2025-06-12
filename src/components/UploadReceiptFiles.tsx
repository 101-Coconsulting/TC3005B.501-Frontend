import { useEffect } from "react";
const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

interface Props {
  receiptId: number;
  pdfFile: File | null;
  xmlFile: File | null;
  token: string;
  onDone: () => void;
  onError: (err: Error) => void;
}

export default function UploadReceiptFiles({
  receiptId,
  pdfFile,
  xmlFile,
  token,
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
      onDone();
    } catch (err) {
      onError(err as Error);
    }
  };

  upload();
}, [receiptId, pdfFile, xmlFile]);

  return null;
}

import { useEffect } from "react";

interface Props {
  receiptId: number;
  pdfFile: File | null;
  xmlFile: File | null;
  onDone: () => void;
  onError: (err: Error) => void;
}

export default function UploadReceiptFiles({
  receiptId,
  pdfFile,
  xmlFile,
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

      const response = await fetch(`https://localhost:3000/api/files/upload-receipt-files/${receiptId}`, {
        method: "POST",
        body: formData,
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

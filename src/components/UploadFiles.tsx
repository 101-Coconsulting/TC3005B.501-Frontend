interface Props {
  onPdfChange?: (file: File | null) => void;
  onXmlChange?: (file: File | null) => void;
  isInternational: boolean;
  setIsInternational: (value: boolean) => void;
}

export default function UploadFiles({
  onPdfChange,
  onXmlChange,
  isInternational,
  setIsInternational,
}: Props) {
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isInternational}
          onChange={(e) => setIsInternational(e.target.checked)}
        />
        Es viaje internacional
      </label>

      <div>
        <label className="text-sm font-medium block mb-1">Subir archivo PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => onPdfChange?.(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-secondary-100 file:text-primary-500 hover:file:bg-secondary-200"
        />
      </div>

      {!isInternational && (
        <div>
          <label className="text-sm font-medium block mb-1">Subir archivo XML</label>
          <input
            type="file"
            accept=".xml"
            onChange={(e) => onXmlChange?.(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-secondary-100 file:text-primary-500 hover:file:bg-secondary-200"
          />
        </div>
      )}
    </div>
  );
}

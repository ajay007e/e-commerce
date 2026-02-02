import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

type Props = {
  value?: string;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => void;
};

export default function ImageUploader({ value, onUpload, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    await onUpload(file);
    setUploading(false);
  };

  return (
    <div className="border rounded-lg p-4">
      {/* Preview */}
      {(preview || value) && (
        <div className="relative mb-3">
          <img
            src={preview || value}
            className="w-full h-48 object-cover rounded"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-white p-2 rounded shadow"
          >
            <FaTrash className="text-red-600" />
          </button>
        </div>
      )}

      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed rounded p-4 text-center hover:bg-gray-50"
      >
        <FaCloudUploadAlt className="mx-auto mb-2 text-xl text-gray-500" />
        <p className="text-sm text-gray-600">
          {uploading ? "Uploading..." : "Click or drag image here"}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />
    </div>
  );
}

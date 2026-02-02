import { useRef, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { FaCloudUploadAlt, FaTrash, FaCheck } from "react-icons/fa";

type Props = {
  value?: string;
  aspect: number; // e.g. 1, 16 / 9
  onUpload: (file: File) => Promise<void>;
  onRemove: () => void;
};

export default function ImageUploaderWithCrop({
  value,
  aspect,
  onUpload,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFile = (file: File) => {
    setImageSrc(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setUploading(true);
    const croppedFile = await getCroppedImage(imageSrc, croppedAreaPixels);
    await onUpload(croppedFile);
    setUploading(false);
    setImageSrc(null);
  };

  return (
    <div className="border rounded-lg p-4">
      {/* Existing image */}
      {!imageSrc && value && (
        <div className="relative mb-3">
          <img
            src={value}
            className="w-full object-cover rounded"
            style={{ aspectRatio: `${aspect}` }}
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-white p-2 rounded shadow"
          >
            <FaTrash className="text-red-600" />
          </button>
        </div>
      )}

      {/* Cropper */}
      {imageSrc && (
        <div className="relative w-full mb-3" style={{ height: 300 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />

          <button
            onClick={handleUpload}
            className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded shadow"
          >
            <FaCheck />
          </button>
        </div>
      )}

      {/* Upload area */}
      {!imageSrc && (
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed rounded p-4 text-center hover:bg-gray-50"
        >
          <FaCloudUploadAlt className="mx-auto mb-2 text-xl text-gray-500" />
          <p className="text-sm text-gray-600">
            {uploading ? "Uploading..." : "Click or drag image here"}
          </p>
        </div>
      )}

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

async function getCroppedImage(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob!], "cropped.jpg", { type: "image/jpeg" }));
    }, "image/jpeg");
  });
}

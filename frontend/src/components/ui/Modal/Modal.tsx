import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;

  /* Optional Config */
  width?: number | string;
  closeOnOverlayClick?: boolean;
  showOverlay?: boolean;
  center?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,

  // Defaults
  width = 500,
  closeOnOverlayClick = true,
  showOverlay = true,
  center = true,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      {showOverlay && (
        <div
          className="absolute inset-0 bg-black/40"
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
      )}

      {/* Panel */}
      <div
        className={`relative bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh] ${
          center ? "mx-auto" : ""
        }`}
        style={{ width }}
      >
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

/*
====================================
USAGE EXAMPLES
====================================

1. Basic Modal

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete Product"
>
  Are you sure?
</Modal>


2. Large Modal

<Modal
  open={open}
  onClose={close}
  width={800}
>
  Content
</Modal>


3. Small Modal

<Modal
  open={open}
  onClose={close}
  width={350}
>
  Content
</Modal>


4. No Overlay Close

<Modal
  open={open}
  onClose={close}
  closeOnOverlayClick={false}
>
  Content
</Modal>


5. No Overlay (Transparent)

<Modal
  open={open}
  onClose={close}
  showOverlay={false}
>
  Content
</Modal>

*/

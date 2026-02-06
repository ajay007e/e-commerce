import React from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;

  /* Optional Config */
  width?: number | string; // 400 | "50%" | "30rem"
  position?: "right" | "left" | "top" | "bottom";
  closeOnOverlayClick?: boolean;
  showOverlay?: boolean;
  fullScreen?: boolean;
}

export default function Drawer({
  open,
  onClose,
  title,
  children,

  // Defaults (Same as your old drawer)
  width = 400,
  position = "right",
  closeOnOverlayClick = true,
  showOverlay = true,
  fullScreen = false,
}: DrawerProps) {
  if (!open) return null;

  /* Position Classes */
  const positionClasses: Record<string, string> = {
    right: "right-0 top-0 h-full",
    left: "left-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  /* Size */
  const sizeStyle = fullScreen
    ? { width: "100%", height: "100%" }
    : position === "left" || position === "right"
      ? { width }
      : { height: width };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      {showOverlay && (
        <div
          className="flex-1 bg-black/30"
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
      )}

      {/* Panel */}
      <div
        className={`absolute bg-white shadow-xl flex flex-col ${
          positionClasses[position]
        }`}
        style={sizeStyle}
      >
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

/*
====================================
USAGE EXAMPLES
====================================

1. Default Drawer (Right, 400px)

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Add Product"
>
  Content here
</Drawer>


2. Left Drawer (300px)

<Drawer
  open={open}
  onClose={close}
  title="Filters"
  position="left"
  width={300}
>
  Content
</Drawer>


3. Bottom Drawer (Mobile Sheet)

<Drawer
  open={open}
  onClose={close}
  position="bottom"
  width="40%"
>
  Content
</Drawer>


4. Fullscreen Drawer

<Drawer
  open={open}
  onClose={close}
  fullScreen
>
  Content
</Drawer>


5. Disable Overlay Click

<Drawer
  open={open}
  onClose={close}
  closeOnOverlayClick={false}
>
  Content
</Drawer>

*/

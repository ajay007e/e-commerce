import { useEffect, useState } from "react";
import AttributeDrawer from "./attributes/AttributeDrawer";
import { getAttributes, type Attribute } from "@/api/attributes.api";

export default function AdminAttributesPage() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<Attribute | null>(null);

  /* Load */
  const loadAttributes = async () => {
    const data = await getAttributes();
    setAttributes(data);
  };

  useEffect(() => {
    loadAttributes();
  }, []);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Attributes</h1>

          <p className="text-sm text-gray-500">Manage product attributes</p>
        </div>

        {/* Add */}
        <button
          onClick={() => {
            setSelected(null);
            setDrawerOpen(true);
          }}
          className="
            inline-flex items-center gap-2
            rounded-md bg-gray-900
            px-4 py-2 text-sm
            font-medium text-white
            hover:bg-gray-800
          "
        >
          + Add Attribute
        </button>
      </div>

      {/* List */}
      <div className="bg-white border rounded divide-y text-sm">
        {attributes.length === 0 && (
          <div className="p-4 text-gray-500">No attributes yet</div>
        )}

        {attributes.map((attr) => (
          <button
            key={attr._id}
            onClick={() => {
              setSelected(attr);
              setDrawerOpen(true);
            }}
            className="
              w-full text-left p-3
              hover:bg-gray-50
              flex justify-between items-center
            "
          >
            <div>
              <div className="font-medium text-gray-900">{attr.name}</div>

              <div className="text-xs text-gray-400">{attr.slug}</div>
            </div>

            <span className="text-xs text-gray-500">{attr.type}</span>
          </button>
        ))}
      </div>

      {/* Drawer */}
      <AttributeDrawer
        open={drawerOpen}
        attribute={selected}
        onClose={() => setDrawerOpen(false)}
        onSaved={loadAttributes}
      />
    </div>
  );
}

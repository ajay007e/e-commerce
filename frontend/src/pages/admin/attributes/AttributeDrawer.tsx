import { useEffect, useState } from "react";
import Drawer from "@/components/ui/Drawer/Drawer";

import {
  createAttribute,
  updateAttribute,
  getAttributeValues,
  createAttributeValue,
  updateAttributeValue,
} from "@/api/attributes.api";

/* ================= TYPES ================= */

export interface Attribute {
  _id: string;
  name: string;
  slug: string;
  type: "select" | "text" | "number";
}

interface AttributeValue {
  _id: string;
  value: string;
}

interface Props {
  open: boolean;
  attribute: Attribute | null;
  onClose: () => void;
  onSaved: () => void;
}

/* ================= COMPONENT ================= */

export default function AttributeDrawer({
  open,
  attribute,
  onClose,
  onSaved,
}: Props) {
  const [tab, setTab] = useState<"details" | "values">("details");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<"select" | "text" | "number">("select");

  const [values, setValues] = useState<AttributeValue[]>([]);
  const [newValue, setNewValue] = useState("");

  const [loading, setLoading] = useState(false);

  /* ============== SLUG ============== */

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  /* ============== LOAD ============== */

  const loadValues = async (id: string) => {
    const data = await getAttributeValues(id);
    setValues(data);
  };

  useEffect(() => {
    if (!open) return;

    setTab("details");

    if (attribute) {
      // Edit
      setName(attribute.name);
      setSlug(attribute.slug);
      setType(attribute.type);

      if (attribute.type === "select") {
        loadValues(attribute._id);
      }
    } else {
      // Create
      setName("");
      setSlug("");
      setType("select");
      setValues([]);
    }
  }, [open, attribute]);

  /* ============== SAVE ATTRIBUTE ============== */

  const saveAttribute = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !slug) return;

    try {
      setLoading(true);

      const payload = { name, slug, type };

      if (attribute) {
        await updateAttribute(attribute._id, payload);
      } else {
        await createAttribute(payload);
      }

      onSaved();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  /* ============== VALUES ============== */

  const addValue = async () => {
    if (!newValue.trim() || !attribute) return;

    await createAttributeValue({
      attributeId: attribute._id,
      value: newValue,
    });

    setNewValue("");
    loadValues(attribute._id);
  };

  const updateValue = async (id: string, value: string) => {
    await updateAttributeValue(id, { value });

    if (attribute) {
      loadValues(attribute._id);
    }
  };

  /* ============== UI ============== */

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={attribute ? "Edit Attribute" : "Add Attribute"}
      width={480}
    >
      {/* Tabs */}
      <div className="border-b mb-4 flex gap-4 text-sm">
        <button
          type="button"
          onClick={() => setTab("details")}
          className={`pb-2 ${
            tab === "details"
              ? "border-b-2 border-gray-900 font-medium"
              : "text-gray-500"
          }`}
        >
          Details
        </button>

        {type === "select" && attribute && (
          <button
            type="button"
            onClick={() => setTab("values")}
            className={`pb-2 ${
              tab === "values"
                ? "border-b-2 border-gray-900 font-medium"
                : "text-gray-500"
            }`}
          >
            Values
          </button>
        )}
      </div>

      {/* ================= DETAILS ================= */}

      {tab === "details" && (
        <form onSubmit={saveAttribute} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>

            <input
              value={name}
              onChange={(e) => {
                const v = e.target.value;

                setName(v);

                if (!attribute) {
                  setSlug(generateSlug(v));
                }
              }}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-medium">Slug</label>

            <input
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="mt-1 w-full border rounded px-3 py-2 text-sm bg-gray-50"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium">Type</label>

            <select
              value={type}
              disabled={!!attribute}
              onChange={(e) => setType(e.target.value as any)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm disabled:bg-gray-100"
            >
              <option value="select">Select</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-gray-900 text-white px-4 py-2 rounded text-sm"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}

      {/* ================= VALUES ================= */}

      {tab === "values" && attribute && type === "select" && (
        <div className="space-y-4">
          {/* Add */}
          <div className="flex gap-2">
            <input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="New value"
              className="flex-1 border rounded px-3 py-2 text-sm"
            />

            <button
              onClick={addValue}
              className="bg-gray-900 text-white px-3 rounded text-sm"
            >
              Add
            </button>
          </div>

          {/* List */}
          <div className="space-y-2">
            {values.map((val) => (
              <input
                key={val._id}
                defaultValue={val.value}
                onBlur={(e) => updateValue(val._id, e.target.value)}
                className="
                  w-full border rounded px-3 py-2 text-sm
                  focus:outline-none focus:ring-1
                  focus:ring-gray-400
                "
              />
            ))}

            {values.length === 0 && (
              <p className="text-sm text-gray-500">No values yet</p>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
}

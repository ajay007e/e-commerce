import { useState } from "react";
import { SHOWCASE_CONFIG } from "@/config/showcase.config";
import type { ShowcaseBlock } from "./config.types";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import ImageUploader from "@/components/ui/Image/ImageUploader";

export default function HomepageShowcaseEditor() {
  const [blocks, setBlocks] = useState<ShowcaseBlock[]>(SHOWCASE_CONFIG);
  const [selectedBlockId, setSelectedBlockId] = useState(blocks[0].id);
  const [saving, setSaving] = useState(false);

  const blockIndex = blocks.findIndex((b) => b.id === selectedBlockId);
  const block = blocks[blockIndex];

  /* ---------- Block helpers ---------- */

  const updateBlock = (field: string, value: any) => {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[blockIndex] = { ...copy[blockIndex], [field]: value };
      return copy;
    });
  };

  const moveBlock = (dir: "up" | "down") => {
    const target = dir === "up" ? blockIndex - 1 : blockIndex + 1;
    if (target < 0 || target >= blocks.length) return;

    const copy = [...blocks];
    [copy[blockIndex], copy[target]] = [copy[target], copy[blockIndex]];
    setBlocks(copy);
    setSelectedBlockId(copy[target].id);
  };

  /* ---------- Item helpers ---------- */

  const updateItem = (itemIndex: number, field: string, value: any) => {
    const items = [...block.items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    updateBlock("items", items);
  };

  const addItem = () => {
    if (block.items.length >= block.maxItems) return;

    updateBlock("items", [
      ...block.items,
      {
        id: `${block.id}-${Date.now()}`,
        name: "New Item",
        imageUrl: "",
        link: "",
      },
    ]);
  };

  const removeItem = (i: number) => {
    const items = block.items.filter((_, idx) => idx !== i);
    updateBlock("items", items);
  };

  const moveItem = (i: number, dir: "up" | "down") => {
    const target = dir === "up" ? i - 1 : i + 1;
    if (target < 0 || target >= block.items.length) return;

    const items = [...block.items];
    [items[i], items[target]] = [items[target], items[i]];
    updateBlock("items", items);
  };

  const save = async () => {
    setSaving(true);
    await configApi.saveShowcaseConfig(blocks);
    setSaving(false);
    alert("Showcase config saved");
  };

  /* ---------- UI ---------- */

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Homepage Showcase Sections
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blocks list */}
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-3">Sections</h3>

          {blocks.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setSelectedBlockId(b.id)}
              className={`w-full text-left p-2 border rounded mb-2 ${
                b.id === selectedBlockId ? "bg-gray-100" : ""
              }`}
            >
              {i + 1}. {b.title}
            </button>
          ))}
        </div>

        {/* Block editor */}
        <div className="lg:col-span-2 bg-white border rounded p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Block Editor</h3>

            <div className="flex gap-2">
              <button onClick={() => moveBlock("up")}>
                <FaArrowUp />
              </button>
              <button onClick={() => moveBlock("down")}>
                <FaArrowDown />
              </button>
            </div>
          </div>

          {/* Block settings */}
          <Input
            label="Title"
            value={block.title}
            onChange={(v) => updateBlock("title", v)}
          />
          <Input
            label="Subtitle"
            value={block.subtitle}
            onChange={(v) => updateBlock("subtitle", v)}
          />
          <Toggle
            label="Enabled"
            value={block.enabled}
            onChange={(v) => updateBlock("enabled", v)}
          />

          <hr className="my-4" />

          {/* Items */}
          <div className="flex justify-between mb-2">
            <h4 className="font-semibold">Items</h4>
            <button
              onClick={addItem}
              disabled={block.items.length >= block.maxItems}
            >
              <FaPlus />
            </button>
          </div>

          {block.items.map((item: any, i: number) => (
            <div key={item.id} className="border rounded p-4 mb-4">
              <div className="flex justify-between mb-2">
                <strong>{item.name || "Item"}</strong>
                <div className="flex gap-2">
                  <button onClick={() => moveItem(i, "up")}>
                    <FaArrowUp />
                  </button>
                  <button onClick={() => moveItem(i, "down")}>
                    <FaArrowDown />
                  </button>
                  <button onClick={() => removeItem(i)}>
                    <FaTrash />
                  </button>
                </div>
              </div>

              <ImageUploader
                value={item.imageUrl}
                onUpload={async (file) => {
                  const res = await configApi.uploadImage(file);
                  updateItem(i, "imageUrl", res.data.url);
                }}
                onRemove={() => updateItem(i, "imageUrl", "")}
              />

              <Input
                label="Name / Title"
                value={item.name || item.title}
                onChange={(v) => updateItem(i, "name", v)}
              />
              <Input
                label="Link"
                value={item.link}
                onChange={(v) => updateItem(i, "link", v)}
              />
            </div>
          ))}

          <div className="mt-6 flex justify-end">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {saving ? "Saving..." : "Save Showcase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small controls ---------- */

function Input({ label, value, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: any) {
  return (
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm">{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

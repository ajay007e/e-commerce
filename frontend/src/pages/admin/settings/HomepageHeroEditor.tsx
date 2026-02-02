import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

import { HERO_CONFIG } from "@/config/hero.config";
import type { HeroConfig } from "./config.types";
import ImageUploaderWithCrop from "@/components/ui/Image/ImageUploaderWithCrop";
import * as configApi from "@/api/admin.config.api";

export default function HomepageHeroEditor() {
  const [config, setConfig] = useState<HeroConfig>(HERO_CONFIG);
  const [selectedId, setSelectedId] = useState(config.slides[0].id);
  const [saving, setSaving] = useState(false);

  const slideIndex = config.slides.findIndex((s) => s.id === selectedId);
  const slide = config.slides[slideIndex];

  useEffect(() => {
    const loadHero = async () => {
      try {
        const dbConfig = await configApi.getHeroConfig();

        if (dbConfig) {
          setConfig(dbConfig);
          setSelectedId(dbConfig.slides?.[0]?.id);
        }
      } catch (err) {
        console.error("Failed to load hero config", err);
      }
    };

    loadHero();
  }, []);
  /* ---------------- Hero-level helpers ---------------- */

  const updateHeroConfig = (field: keyof HeroConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateTextTransition = (
    field: keyof HeroConfig["textTransition"],
    value: number,
  ) => {
    setConfig((prev) => ({
      ...prev,
      textTransition: {
        ...prev.textTransition,
        [field]: value,
      },
    }));
  };

  /* ---------------- Slide helpers ---------------- */

  const updateSlide = (field: string, value: any) => {
    setConfig((prev) => {
      const slides = [...prev.slides];
      slides[slideIndex] = { ...slides[slideIndex], [field]: value };
      return { ...prev, slides };
    });
  };

  const addSlide = () => {
    if (config.slides.length >= config.maxSlides) return;

    const newSlide = {
      id: `hero-${Date.now()}`,
      imageUrl: "",
      altText: "",
      subText: "",
      headline: "New Slide",
      ctaLabel: "",
      ctaLink: "",
    };

    setConfig((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
    setSelectedId(newSlide.id);
  };

  const removeSlide = () => {
    if (config.slides.length <= 1) return;

    const slides = config.slides.filter((s) => s.id !== selectedId);
    setConfig((prev) => ({ ...prev, slides }));
    setSelectedId(slides[0].id);
  };

  const moveSlide = (dir: "up" | "down") => {
    const target = dir === "up" ? slideIndex - 1 : slideIndex + 1;
    if (target < 0 || target >= config.slides.length) return;

    const slides = [...config.slides];
    [slides[slideIndex], slides[target]] = [slides[target], slides[slideIndex]];
    setConfig((prev) => ({ ...prev, slides }));
    setSelectedId(slides[target].id);
  };

  /* ---------------- Save ---------------- */

  const save = async () => {
    setSaving(true);

    const formData = new FormData();

    const cleanConfig = {
      ...config,
      slides: config.slides.map(({ _file, ...rest }: any) => rest),
    };

    formData.append("config", JSON.stringify(cleanConfig));

    config.slides.forEach((slide: any) => {
      if (slide._file) {
        formData.append(slide.id, slide._file);
      }
    });

    await configApi.saveHeroConfig(formData);

    setSaving(false);
    alert("Hero saved");
  };

  /* ---------------- UI ---------------- */

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Homepage Hero</h2>

      {/* ================= HERO SETTINGS ================= */}
      <div className="bg-white border rounded p-6 mb-6">
        <h3 className="font-semibold mb-4">Hero Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Enabled */}
          <div>
            <label className="block text-sm mb-1">Enabled</label>
            <select
              value={config.enabled ? "true" : "false"}
              onChange={(e) =>
                updateHeroConfig("enabled", e.target.value === "true")
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>

          {/* Auto rotate */}
          <div>
            <label className="block text-sm mb-1">
              Auto Rotate Interval (ms)
            </label>
            <input
              type="number"
              min={1000}
              step={500}
              value={config.autoRotateInterval}
              onChange={(e) =>
                updateHeroConfig("autoRotateInterval", Number(e.target.value))
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Max slides */}
          <div>
            <label className="block text-sm mb-1">Max Slides</label>
            <input
              type="number"
              min={1}
              max={10}
              value={config.maxSlides}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                setConfig((prev) => ({
                  ...prev,
                  maxSlides: newMax,
                  slides: prev.slides.slice(0, newMax),
                }));
              }}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Text transition */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mt-4 mb-2">
              Text Transition Timing (ms)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Sub Text Delay"
                value={String(config.textTransition.subTextDelay)}
                onChange={(v) =>
                  updateTextTransition("subTextDelay", Number(v))
                }
              />
              <Input
                label="Headline Delay"
                value={String(config.textTransition.headlineDelay)}
                onChange={(v) =>
                  updateTextTransition("headlineDelay", Number(v))
                }
              />
              <Input
                label="CTA Delay"
                value={String(config.textTransition.ctaDelay)}
                onChange={(v) => updateTextTransition("ctaDelay", Number(v))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SLIDE EDITOR ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slides list */}
        <div className="bg-white border rounded p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Slides</h3>
            <button
              onClick={addSlide}
              disabled={config.slides.length >= config.maxSlides}
              className="disabled:opacity-40"
            >
              <FaPlus />
            </button>
          </div>

          {config.slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`w-full text-left p-2 border rounded mb-2 ${
                s.id === selectedId ? "bg-gray-100" : ""
              }`}
            >
              {i + 1}. {s.headline}
            </button>
          ))}
        </div>

        {/* Slide editor */}
        <div className="lg:col-span-2 bg-white border rounded p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Slide Editor</h3>

            <div className="flex gap-2">
              <button onClick={() => moveSlide("up")}>
                <FaArrowUp />
              </button>
              <button onClick={() => moveSlide("down")}>
                <FaArrowDown />
              </button>
              <button
                onClick={removeSlide}
                className="text-red-600"
                disabled={config.slides.length <= 1}
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Image uploader */}
          <ImageUploaderWithCrop
            aspect={16 / 5} // square
            value={slide.imageUrl}
            onUpload={(file) => {
              // store file locally (frontend only)
              updateSlide("_file", file);

              // preview immediately
              updateSlide("imageUrl", URL.createObjectURL(file));
            }}
            onRemove={() => {
              updateSlide("imageUrl", "");
              updateSlide("_file", undefined as any);
            }}
          />

          {/* Fields */}
          <Input
            label="Alt Text"
            value={slide.altText}
            onChange={(v) => updateSlide("altText", v)}
          />
          <Input
            label="Sub Text"
            value={slide.subText}
            onChange={(v) => updateSlide("subText", v)}
          />
          <Input
            label="Headline"
            value={slide.headline}
            onChange={(v) => updateSlide("headline", v)}
          />
          <Input
            label="CTA Label"
            value={slide.ctaLabel}
            onChange={(v) => updateSlide("ctaLabel", v)}
          />
          <Input
            label="CTA Link"
            value={slide.ctaLink}
            onChange={(v) => updateSlide("ctaLink", v)}
          />

          <div className="mt-6 flex justify-end">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {saving ? "Saving..." : "Save Hero"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL INPUT ================= */

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
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

import { FaStore, FaMoneyBillWave, FaToggleOn } from "react-icons/fa";

export default function GlobalConfig() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Global Configuration</h2>
        <p className="text-gray-600 mt-1">
          Manage store-wide settings and default behavior.
        </p>
      </div>

      <div className="space-y-6">
        {/* Store Identity */}
        <ConfigCard
          icon={<FaStore />}
          title="Store Identity"
          description="Basic information used across the website."
        >
          <InputRow label="Store Name" value="SimpleShop" />
          <InputRow label="Support Email" value="support@simpleshop.com" />
          <InputRow label="Support Phone" value="+91 98765 43210" />
          <InputRow label="Store Logo" value="Uploaded" />
        </ConfigCard>

        {/* Commerce Defaults */}
        <ConfigCard
          icon={<FaMoneyBillWave />}
          title="Commerce Defaults"
          description="Default values for pricing and checkout behavior."
        >
          <InputRow label="Currency" value="INR (₹)" />
          <InputRow label="Default Country" value="India" />
          <InputRow label="Tax Included in Price" value="Yes" />
        </ConfigCard>

        {/* Feature Toggles */}
        <ConfigCard
          icon={<FaToggleOn />}
          title="Feature Toggles"
          description="Enable or disable global store features."
        >
          <ToggleRow label="Guest Checkout" enabled />
          <ToggleRow label="Cash on Delivery" enabled />
          <ToggleRow label="Product Reviews" enabled={false} />
        </ConfigCard>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function ConfigCard({
  icon,
  title,
  description,
  children,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xl text-gray-700">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="space-y-3">{children}</div>

      <div className="pt-4 flex justify-end">
        <button
          disabled
          className="text-sm px-4 py-2 rounded border text-gray-400 cursor-not-allowed"
        >
          Edit (Coming Soon)
        </button>
      </div>
    </div>
  );
}

function InputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <input
        disabled
        value={value}
        className="border rounded px-2 py-1 text-sm bg-gray-100 text-gray-700 w-56"
      />
    </div>
  );
}

function ToggleRow({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span
        className={`font-medium ${
          enabled ? "text-green-600" : "text-gray-400"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
}

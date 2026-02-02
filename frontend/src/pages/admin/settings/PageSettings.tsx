import { FaFileAlt, FaEdit } from "react-icons/fa";

export default function PagesSettings() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Static Pages</h2>
        <p className="text-gray-600 mt-1">
          Manage content for informational pages shown on your website.
        </p>
      </div>

      {/* Pages Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Page
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                URL
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Status
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            <PageRow title="About Us" path="/about" status="Published" />
            <PageRow
              title="Privacy Policy"
              path="/privacy"
              status="Published"
            />
            <PageRow
              title="Terms & Conditions"
              path="/terms"
              status="Published"
            />
            <PageRow
              title="Shipping Policy"
              path="/shipping"
              status="Published"
            />
            <PageRow
              title="Refund & Return Policy"
              path="/refund"
              status="Published"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Row component ---------- */

function PageRow({
  title,
  path,
  status,
}: {
  title: string;
  path: string;
  status: "Published" | "Draft";
}) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="px-4 py-3 flex items-center gap-2">
        <FaFileAlt className="text-gray-500" />
        <span className="font-medium">{title}</span>
      </td>

      <td className="px-4 py-3 text-gray-600">{path}</td>

      <td className="px-4 py-3">
        <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-700">
          {status}
        </span>
      </td>

      <td className="px-4 py-3 text-right">
        <button
          disabled
          className="inline-flex items-center gap-1 text-sm text-blue-600 opacity-60 cursor-not-allowed"
        >
          <FaEdit />
          Edit
        </button>
      </td>
    </tr>
  );
}

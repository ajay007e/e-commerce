export default function AdminDashboard() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of store performance</p>
      </div>

      {/* Content */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Dashboard metrics will appear here.
        </p>
      </div>
    </div>
  );
}

function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

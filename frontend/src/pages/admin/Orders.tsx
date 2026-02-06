export default function AdminOrders() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Header (Dashboard Style) */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Orders</h1>

        <p className="text-sm text-gray-500">View and manage customer orders</p>
      </div>

      {/* Placeholder Content (Optional) */}
      {/* Remove later when real UI is ready */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <p className="text-sm text-gray-500">Orders list will appear here.</p>
      </div>
    </div>
  );
}

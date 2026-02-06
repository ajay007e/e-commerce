export default function AdminUsers() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Header (Dashboard Style) */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Users</h1>

        <p className="text-sm text-gray-500">View, block, or unblock users</p>
      </div>

      {/* Placeholder Content (Optional) */}
      {/* Remove this later when real UI is ready */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          User management will appear here.
        </p>
      </div>
    </div>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center bg-gray-50 p-12">
      {children}
    </main>
  );
}

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

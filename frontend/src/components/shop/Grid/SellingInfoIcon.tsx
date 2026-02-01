import { FaFire, FaUsers, FaExclamationTriangle } from "react-icons/fa";

interface SellingInfoIconProps {
  type?: "fire" | "users" | "alert";
}

export function SellingInfoIcon({ type }: SellingInfoIconProps) {
  if (!type) return null;

  const map = {
    fire: <FaFire className="text-orange-500" />,
    users: <FaUsers className="text-blue-500" />,
    alert: <FaExclamationTriangle className="text-yellow-500" />,
  } as const;

  return (
    <span aria-hidden="true" className="flex items-center">
      {map[type]}
    </span>
  );
}

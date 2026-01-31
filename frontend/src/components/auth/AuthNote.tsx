import { Link } from "react-router-dom";

export function AuthNote() {
  return (
    <p className="text-center text-xs text-neutral-500 leading-relaxed">
      We take your privacy seriously. Your information is encrypted and handled
      in accordance with our{" "}
      <Link to="/privacy" className="underline hover:text-neutral-700">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link to="/terms" className="underline hover:text-neutral-700">
        Terms of Service
      </Link>
      .
    </p>
  );
}

import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, currentUser, onOpenPopup }) {
  const hasOpenedPopup = useRef(false);

  useEffect(() => {
    if (!currentUser && !hasOpenedPopup.current) {
      hasOpenedPopup.current = true;
      onOpenPopup("login");
    }
  }, [currentUser, onOpenPopup]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

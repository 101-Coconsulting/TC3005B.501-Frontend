import { useState, useRef, useEffect } from "react";
import { apiRequest } from "@utils/apiClient";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export default function LogoutButton({ children }: LogoutButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await apiRequest("/api/user/logout", {
      method: "GET",
    });
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (confirmRef.current && !confirmRef.current.contains(event.target as Node)) {
        setShowConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={confirmRef}>
      <button
        onClick={() => setShowConfirm(!showConfirm)}
        className="bg-primary-300 rounded-lg p-2.5 h-10 w-10 flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-primary-50"
      >
        {children}
      </button>

      {showConfirm && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl rounded-lg p-4 z-100 border border-gray-200">
          <p className="text-gray-800 mb-4 text-sm">¿Estás seguro de que deseas cerrar sesión?</p>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

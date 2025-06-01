import React from "react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("https://localhost:3000/api/user/logout", {
      method: "GET",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
    >
      Salir
    </button>
  );
}

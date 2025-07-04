import React, { useState } from "react";
import Button from "@components/Button";
import { apiRequest } from "@utils/apiClient";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiRequest("/user/logout", {
      method: "GET",
    });


    try {

      const response = await apiRequest("/user/login", {
        method: "POST",
        data: { username, password },
      });

      setErrorMessage("");
    
      alert("Inicio de sesión exitoso");

      // Set cookies manually on client side to ensure they're available immediately
      document.cookie = `token=${response.token}; path=/; secure; SameSite=Strict`;
      document.cookie = `role=${response.role}; path=/`;
      document.cookie = `username=${response.username}; path=/`;
      document.cookie = `user_id=${response.user_id}; path=/`;
      document.cookie = `department_id=${response.department_id}; path=/`;
      window.location.href = "/dashboard";

    } catch (error: any) {
      const msg = error?.response?.data?.error || "Error al iniciar sesión";
      setErrorMessage(msg);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-purple-700 via-indigo-800 to-black bg-cover bg-center relative"
      // style={{
      //   backgroundImage:
      //     "url('')",
      // }}
    >
      <div>
        <img
          src="/Logo.svg"
          className="w-40 h-40 absolute top-5 left-10 drop-shadow-lg"
        />
      </div>
      <div className="relative w-[407px] h-[455px] bg-white/10 border border-white/30 backdrop-blur-md rounded-lg shadow-lg flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[310px] text-white">
          <h2 className="text-2xl text-center font-semibold mb-8">Login</h2>

          <div className="relative mb-8 border-b border-white">
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer w-full h-[50px] bg-transparent border-none outline-none text-white px-1 placeholder-transparent"
              placeholder="Usuario"
            />
            <label
              htmlFor="username"
              className="absolute left-1 text-sm text-white transition-all duration-200
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%]
                        peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
            >
              Usuario
            </label>
          </div>

          <div className="relative mb-6 border-b border-white">
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full h-[50px] bg-transparent border-none outline-none text-white px-1 placeholder-transparent"
              placeholder="Contraseña"
            />
            <label
              htmlFor="password"
              className="absolute left-1 text-sm text-white transition-all duration-200
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%]
                        peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
            >
              Contraseña
            </label>
          </div>

          <Button
            type="submit"
            variant="filled"
            color="primary"
            size="medium"
            className="w-full rounded-full"
          >
            Login
          </Button>

          {errorMessage && (
            <p className="mt-4 text-center text-sm text-black-400">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

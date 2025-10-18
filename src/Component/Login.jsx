import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/t", { replace: true });
  };

  return (
    <div className="bg-gray-500 flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Masukkan Alamat Email Anda"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Masukkan Password Anda"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-green-700"
        >
          Login
        </button>
        <p className="text-sm text-center mt-2">
          Belum punya akun?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Daftar disini
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;

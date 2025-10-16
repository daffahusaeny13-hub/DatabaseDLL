import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login", { replace: true }); 
  };

  return (
    <div className="flex items-center justify-center bg-sky-500 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Masukkan Nama Anda"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Masukkan Email Anda"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Buat Password"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          Daftar
        </button>

        <p className="text-sm text-center mt-2">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login disini
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;

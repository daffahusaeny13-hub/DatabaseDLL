import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TambahDataGuru = ({ data, setData }) => {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !jabatan) {
      return;
    }

    const newGuru = {
      id: Date.now(),
      nama,
      jabatan,
    };

    setData([...data, newGuru]);

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: `Data guru "${nama}" berhasil ditambahkan!`,
      confirmButtonColor: "#3B82F6",
    }).then(() => {
      navigate("/dashboard"); 
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Tambah Data Guru
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan Nama Guru"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Jabatan</label>
            <input
              type="text"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              placeholder="Masukkan Jabatan"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahDataGuru;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TambahDataSiswa = ({ data, setData }) => {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !kelas || !jurusan) {
      return;
    }

    const newSiswa = {
      id: Date.now(),
      nama,
      kelas,
      jurusan,
    };

    setData([...data, newSiswa]);

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: `Data siswa "${nama}" berhasil ditambahkan!`,
      confirmButtonColor: "#3B82F6",
    }).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Tambah Data Siswa
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan Nama Siswa"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Kelas</label>
            <input
              type="text"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              placeholder="Masukkan Kelas"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Jurusan</label>
            <input
              type="text"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              placeholder="Masukkan Jurusan"
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

export default TambahDataSiswa;

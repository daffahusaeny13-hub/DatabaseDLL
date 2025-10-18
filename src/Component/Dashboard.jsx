import React, { useEffect, useState } from "react";
import Sidnav from "./Sidnav";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [jumlah, setJumlah] = useState({
    siswa: 0,
    guru: 0,
    karyawan: 0,
  });

  useEffect(() => {
    const siswa = JSON.parse(localStorage.getItem("dataSiswa")) || [];
    const guru = JSON.parse(localStorage.getItem("dataGuru")) || [];
    const karyawan = JSON.parse(localStorage.getItem("dataKaryawan")) || [];
    setJumlah({
      siswa: siswa.length,
      guru: guru.length,
      karyawan: karyawan.length,
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidnav />
      <div className="p-6 ml-70 w-full">
        <div className="flex flex-wrap gap-4">
          <div className="bg-blue-500 text-white rounded-xl shadow p-4 flex-1 min-w-[250px]">
            <h2 className="text-center text-lg font-semibold mb-2">Data Siswa</h2>
            <p className="text-center text-sm mb-2">{jumlah.siswa}</p>
            <button
              onClick={() => navigate("/t")}
              className="bg-green-500 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-500"
            >
              Lihat Data
            </button>
          </div>

          <div className="bg-yellow-400 text-black rounded-xl shadow p-4 flex-1 min-w-[250px]">
            <h2 className="text-center text-lg font-semibold mb-2">Data Guru</h2>
            <p className="text-center text-sm mb-2">{jumlah.guru}</p>
            <button
              onClick={() => navigate("/t")}
              className="bg-blue-500 text-yellow-600 px-3 py-1 rounded text-sm hover:bg-yellow-400"
            >
              Lihat Data
            </button>
          </div>

          <div className="bg-green-500 text-white rounded-xl shadow p-4 flex-1 min-w-[250px]">
            <h2 className="text-center text-lg font-semibold mb-2">Data Karyawan</h2>
            <p className="text-center text-sm mb-2">{jumlah.karyawan}</p>
            <button
              onClick={() => navigate("/t")}
              className="bg-yellow-400 text-green-600 px-3 py-1 rounded text-sm hover:bg-green-500"
            >
              Lihat Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
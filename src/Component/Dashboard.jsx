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

  const ambilData = async () => {
    try {
      const [resSiswa, resGuru, resKaryawan] = await Promise.all([
        fetch("http://localhost:5000/siswa"),
        fetch("http://localhost:5000/guru"),
        fetch("http://localhost:5000/karyawan"),
      ]);

      const dataSiswa = await resSiswa.json();
      const dataGuru = await resGuru.json();
      const dataKaryawan = await resKaryawan.json();

      setJumlah({
        siswa: dataSiswa.length,
        guru: dataGuru.length,
        karyawan: dataKaryawan.length,
      });
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  useEffect(() => {
    ambilData();
    const interval = setInterval(ambilData, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-sky-300">
      <Sidnav />
      <div className="p-6 ml-65 w-full">
        <div className="flex flex-wrap gap-4">
          <div className="bg-blue-400 text-white rounded-xl shadow p-4 flex-1 min-w-[250px] hover:scale-105 transition-transform">
            <h2 className="text-center text-lg font-semibold mb-2">Data Siswa</h2>
            <p className="text-center text-3xl font-bold mb-2">{jumlah.siswa}</p>
            <button
              onClick={() => navigate("/t")}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm transition-colors hover:bg-sky-400"
            >
              Lihat Data
            </button>
          </div>

          <div className="bg-yellow-400 text-black rounded-xl shadow p-4 flex-1 min-w-[250px] hover:scale-105 transition-transform">
            <h2 className="text-center text-lg font-semibold mb-2">Data Guru</h2>
            <p className="text-center text-3xl font-bold mb-2">{jumlah.guru}</p>
            <button
              onClick={() => navigate("/t")}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm transition-colors hover:bg-sky-400"
            >
              Lihat Data
            </button>
          </div>

          <div className="bg-green-500 text-white rounded-xl shadow p-4 flex-1 min-w-[250px] hover:scale-105 transition-transform">
            <h2 className="text-center text-lg font-semibold mb-2">Data Karyawan</h2>
            <p className="text-center text-3xl font-bold mb-2">{jumlah.karyawan}</p>
            <button
              onClick={() => navigate("/t")}
              className="bg-yellow-400 text-black px-3 py-1 rounded text-sm transition-colors hover:bg-sky-600"
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
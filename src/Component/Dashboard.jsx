import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ 
  dataGuru = [], setDataGuru, 
  dataSiswa = [], setDataSiswa, 
  dataKaryawan = [], setDataKaryawan 
}) => {
  const [tipe, setTipe] = useState("Siswa");
  const navigate = useNavigate();

  const dataTampil =
  tipe === "Guru" ? dataGuru :
  tipe === "Siswa" ? dataSiswa :
    dataKaryawan;

  const setData =
    tipe === "Siswa" ? setDataSiswa :
    tipe === "Guru" ? setDataGuru :
    setDataKaryawan;

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <select
          value={tipe}
          onChange={(e) => setTipe(e.target.value)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          <option value="Siswa">Siswa</option>
          <option value="Guru">Guru</option>
          <option value="Karyawan">Karyawan</option>
        </select>

        <button
          onClick={() =>
            navigate(
               tipe === "Siswa"
                ? "/TambahDataSiswa"
                : tipe === "Guru"
                ? "/TambahDataGuru"
                : "/TambahDataKaryawan"
            )
          }
          className="bg-black text-white px-3 py-1 rounded"
        >
          Tambah Data {tipe}
        </button>
      </div>

      <table className="border text-center">
        <thead>
          <tr>
            <th className="border px-2">Nomor</th>
            <th className="border px-2">Nama</th>
            <th className="border px-2">Kelas/Jabatan</th>
            <th className="border px-2">Jurusan/Nomor HP</th>
            <th className="border px-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataTampil.length === 0 ? (
            <tr>
              <td colSpan="5" className="border py-2">Tidak ada data</td>
            </tr>
          ) : (
            dataTampil.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-2">{index + 1}</td>
                <td className="border px-2">{item.nama}</td>
                <td className="border px-2">{item.kelas || item.jabatan}</td>
                <td className="border px-2">{item.jurusan || item.nomorhp}</td>
                <td className="border px-2">
                  <button
                    onClick={() => setData(dataTampil.filter((d) => d.id !== item.id))}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

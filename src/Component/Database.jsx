import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Sidnav from "./Sidnav";

const Database = () => {
  const [tipe, setTipe] = useState("Siswa");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama: "", kelas: "", jurusan: "", jabatan: "", nomorhp: "" });
  const API_URL = "http://localhost:5174";

  useEffect(() => {
    fetchData();
  }, [tipe]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/${tipe.toLowerCase()}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Error ambil data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData =
      tipe === "Siswa"
        ? { nama: form.nama, kelas: form.kelas, jurusan: form.jurusan, alamat: form.alamat, nomorhp: form.nomorhp }
        : tipe === "Guru"
        ? { nama: form.nama, alamat: form.alamat, nomorhp: form.nomorhp }
        : { nama: form.nama, alamat: form.alamat, nomorhp: form.nomorhp };

    try {
      await fetch(`${API_URL}/${tipe.toLowerCase()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Data ${tipe.toLowerCase()} berhasil ditambahkan!`,
        confirmButtonColor: "#3B82F6",
      });

      setForm({ nama: "", kelas: "", jurusan: "", alamat: "", nomorhp: "" });
      await fetchData();
    } catch (err) {
      console.error("Error tambah data:", err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#EF4444",
    });

    if (result.isConfirmed) {
      await fetch(`${API_URL}/${tipe.toLowerCase()}/${id}`, { method: "DELETE" });
      setData(data.filter((item) => item.id !== id));
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
    }
  };

  const handleNoHpChange = (e) => {
    const angka = e.target.value.replace(/\D/g, "");
    if (angka.length <= 13) setForm({ ...form, nomorhp: angka });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidnav />
  
      <div className="flex-1 flex flex-col items-center py-10 px-4 ml-60">
        <h1 className="text-4xl font-bold mb-6">Database</h1>
  

        <div className="flex gap-2 mb-6">
          <select
            value={tipe}
            onChange={(e) => setTipe(e.target.value)}
            className="bg-black text-white px-3 py-1 rounded"
          >
            <option value="Siswa">Siswa</option>
            <option value="Guru">Guru</option>
            <option value="Karyawan">Karyawan</option>
          </select>
        </div>

        <table className="border text-center bg-white shadow-md rounded w-full max-w-4xl mb-10">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-1">No</th>
              <th className="border px-3 py-1">Nama</th>

              {tipe === "Siswa" && (
                <>
                  <th className="border px-3 py-1">Kelas</th>
                  <th className="border px-3 py-1">Jurusan</th>
                  <th className="border px-3 py-1">Alamat</th>
                  <th className="border px-3 py-1">Nomor HP</th>
                </>
              )}

              {tipe === "Guru" && (
                <>
                <th className="border px-3 py-1">Alamat</th>
                <th className="border px-3 py-1">Nomor HP</th>
                </>
              )}

              {tipe === "Karyawan" && (
                <>
                <th className="border px-3 py-1">Nomor HP</th>
                <th className="border px-3 py-1">Alamat</th>
                </>
              )}

              <th className="border px-3 py-1">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="border py-2">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-3 py-1">{index + 1}</td>
                  <td className="border px-3 py-1">{item.nama}</td>

                  {tipe === "Siswa" && (
                    <>
                      <td className="border px-3 py-1">{item.kelas}</td>
                      <td className="border px-3 py-1">{item.jurusan}</td>
                      <td className="border px-3 py-1">{item.alamat}</td>
                      <td className="border px-3 py-1">{item.nomorhp || "-"}</td>
                    </>
                  )}

                  {tipe === "Guru" && (
                    <>
                    <td className="border px-3 py-1">{item.alamat}</td>
                    <td className="border px-3 py-1">{item.nomorhp || "-"}</td>
                    </>
                  )}

                  {tipe === "Karyawan" && (
                    <>
                    <td className="border px-3 py-1">{item.alamat}</td>
                    <td className="border px-3 py-1">{item.nomorhp || "-"}</td>
                    </>
                  )}

                  <td className="border px-3 py-1">
                    <button
                      onClick={() => handleDelete(item.id)}
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

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Tambah Data {tipe}
          </h2>

          <input
            type="text"
            placeholder="Masukkan Nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="border w-full mb-2 p-2 rounded"
            required
          />

          {tipe === "Siswa" && (
            <>
              <input
                type="text"
                placeholder="Masukkan Kelas"
                value={form.kelas}
                onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                className="border w-full mb-2 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Masukkan Jurusan"
                value={form.jurusan}
                onChange={(e) => setForm({ ...form, jurusan: e.target.value })}
                className="border w-full mb-2 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Masukkan Alamat"
                value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="border w-full mb-2 p-2 rounded"
                required
                />
              <input
                type="number"
                placeholder="Masukkan Nomor HP"
                value={form.nomorhp}
                onChange={handleNoHpChange}
                className="border w-full mb-2 p-2 rounded"
                required
              />
            </>
          )}

          {tipe === "Guru" && (
            <>
            <input
              type="text"
              placeholder="Masukkan Alamat"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="border w-full mb-2 p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Masukkan Nomor HP"
              value={form.nomorhp}
              onChange={handleNoHpChange}
              className="border w-full mb-2 p-2 rounded"
              required
            />
           </>
          )}

          {tipe === "Karyawan" && (
            <>
            <input
              type="number"
              placeholder="Masukkan Nomor HP"
              value={form.nomorhp}
              onChange={handleNoHpChange}
              className="border w-full mb-2 p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Masukkan Alamat"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="border w-full mb-2 p-2 rounded"
              required
            />
            </>
          )}

          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default Database;

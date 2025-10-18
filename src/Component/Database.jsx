import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Sidnav from "./Sidnav";

const Database = () => {
  const [tipe, setTipe] = useState("Siswa");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama: "", kelas: "", jurusan: "", alamat: "", nomorhp: "", });
  const API = "http://localhost:5174";

  useEffect(() => {
    ambilData();
  }, [tipe]);

  const ambilData = async () => {
    try {
      const res = await fetch(`${API}/${tipe.toLowerCase()}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const tambahData = async (e) => {
    e.preventDefault();

    const baru =
      tipe === "Siswa"
        ? { nama: form.nama, kelas: form.kelas, jurusan: form.jurusan, nomorhp: form.nomorhp, }
        : { nama: form.nama, alamat: form.alamat, nomorhp: form.nomorhp, };

    await fetch(`${API}/${tipe.toLowerCase()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(baru),
    });

    Swal.fire("Berhasil!", `Data ${tipe} ditambah.`, "success");
    setForm({ nama: "", kelas: "", jurusan: "", alamat: "", nomorhp: "" });
    ambilData();
  };

  const hapusData = async (id) => {
    await fetch(`${API}/${tipe.toLowerCase()}/${id}`, { method: "DELETE" });
    Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
    ambilData();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidnav />

      <div className="flex-1 py-10 px-4 ml-60 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Database {tipe}</h1>

        <select
          value={tipe}
          onChange={(e) => setTipe(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option>Siswa</option>
          <option>Guru</option>
          <option>Karyawan</option>
        </select>

        <table className="w-full max-w-4xl mx-auto border mb-6 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th>No</th>
              <th>Nama</th>
              {tipe === "Siswa" && (
                <>
                  <th>Kelas</th>
                  <th>Jurusan</th>
                </>
              )}
              {tipe !== "Siswa" && <th>Alamat</th>}
              <th>Nomor HP</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-2">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((x, i) => (
                <tr key={x.id}>
                  <td>{i + 1}</td>
                  <td>{x.nama}</td>
                  {tipe === "Siswa" && (
                    <>
                      <td>{x.kelas}</td>
                      <td>{x.jurusan}</td>
                    </>
                  )}
                  {tipe !== "Siswa" && <td>{x.alamat}</td>}
                  <td>{x.nomorhp}</td>
                  <td>
                    <button
                      onClick={() => hapusData(x.id)}
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
        <form
          onSubmit={tambahData}
          className="max-w-md mx-auto bg-white p-4 rounded shadow"
        >
          <h2 className="text-xl font-bold mb-2">Tambah Data {tipe}</h2>

          <input
            placeholder="Nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="border w-full p-2 mb-2 rounded"
            required
          />

          {tipe === "Siswa" && (
            <>
              <input
                placeholder="Kelas"
                value={form.kelas}
                onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                className="border w-full p-2 mb-2 rounded"
                required
              />
              <input
                placeholder="Jurusan"
                value={form.jurusan}
                onChange={(e) => setForm({ ...form, jurusan: e.target.value })}
                className="border w-full p-2 mb-2 rounded"
                required
              />
            </>
          )}

          {tipe !== "Siswa" && (
            <input
              placeholder="Alamat"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="border w-full p-2 mb-2 rounded"
              required
            />
          )}

          <input
            placeholder="Nomor HP"
            value={form.nomorhp}
            onChange={(e) =>
              setForm({ ...form, nomorhp: e.target.value.replace(/\D/g, "") })
            }
            className="border w-full p-2 mb-2 rounded"
            required
          />

          <button className="bg-blue-600 text-white w-full py-2 rounded">
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default Database;

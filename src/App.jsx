import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidnav from "./Component/Sidnav";
import Dashboard from "./Component/Dashboard";
import TambahDataSiswa from "./Component/TambahDataSiswa";
import TambahDataGuru from "./Component/TambahDataGuru";
import TambahDataKaryawan from "./Component/TambahDataKaryawan";

const App = () => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataGuru, setDataGuru] = useState([]);
  const [dataKaryawan, setDataKaryawan] = useState([]);

  return (
    <Router>
      <div className="flex min-h-screen">
        <div className="w-60">
          <Sidnav />
        </div>
        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard dataSiswa={dataSiswa} setDataSiswa={setDataSiswa} dataGuru={dataGuru} setDataGuru={setDataGuru} dataKaryawan={dataKaryawan} setDataKaryawan={setDataKaryawan} />} />
            <Route path="/dashboard" element={ <Dashboard dataSiswa={dataSiswa} setDataSiswa={setDataSiswa} dataGuru={dataGuru} setDataGuru={setDataGuru} dataKaryawan={dataKaryawan} setDataKaryawan={setDataKaryawan} />} />
            <Route path="/tambahdatasiswa" element={<TambahDataSiswa data={dataSiswa} setData={setDataSiswa} />} />
            <Route path="/tambahdataguru" element={<TambahDataGuru data={dataGuru} setData={setDataGuru} />} />
            <Route path="/tambahdatakaryawan" element={<TambahDataKaryawan data={dataKaryawan} setData={setDataKaryawan} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
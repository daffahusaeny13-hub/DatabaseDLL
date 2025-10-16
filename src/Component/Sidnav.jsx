import React from "react";
import { Link } from "react-router-dom";

const Sidnav = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-cyan-900 text-white flex flex-col p-4 z-50">
      <h2 className="text-center font-semibold mb-6">Sidnav</h2>
      <div className="border-gray-700 my-2">
        <Link to="/t" className="bg-yellow-500 text-center block py-2 px-3 rounded hover:bg-blue-600 animate-pulse">#Database</Link>
        <Link to="/d" className="bg-yellow-500 text-center block py-2 px-3 rounded hover:bg-blue-600 animate-pulse">#Dashboard</Link> 
        <hr className="border-gray-700 my-2" />
        <a href="/login" className="bg-red-500 text-center mt-100 block py-2 px-3 rounded hover:bg-blue-600 animate-pulse">logout</a>
      </div>
    </div>
  );
};

export default Sidnav;

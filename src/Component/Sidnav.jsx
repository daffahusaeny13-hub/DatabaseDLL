import React from "react";
import { Link } from "react-router-dom";

const Sidnav = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-black text-white flex flex-col p-4 z-50">
      <h2 className="text-center font-semibold mb-6">Sidnav</h2>
      <div className="border-gray-700 my-2">
        <Link to="/dashboard" className="hohover:bg-gray-700 p-2 rounded transition duration-200 block">Dashboard</Link>
        <hr className="border-gray-700 my-2" />
        <Link to="/logout" className="hover:bg-gray-700 p-2 rounded transition duration-200 block">Logout</Link>
      </div>
    </div>
  );
};

export default Sidnav;

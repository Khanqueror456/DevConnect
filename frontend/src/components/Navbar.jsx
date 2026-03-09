import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {

  const { logout } = useAuth();

  return (
    <div className="border-b border-gray-800 bg-[#020617]">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-semibold text-blue-400">
          DevConnect
        </h1>

        <div className="flex gap-6 text-gray-400">

          <button className="hover:text-white">
           <Link to="/">Feed</Link>
          </button>

          <button className="hover:text-white">
            Connections
          </button>

          <button className="hover:text-white">
            Profile
          </button>

          <button onClick={logout} className="text-white hover:cursor-pointer bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium">
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}
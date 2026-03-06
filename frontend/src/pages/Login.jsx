import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login",{email,password});

      setUser(res.data.user);

      navigate("/");
    } catch(err){
      alert("Login failed");
    }
  };

  return (
    <AuthLayout
      leftContent={
        <>
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back, Developer!
          </h1>

          <p className="text-gray-400">
            Connect, Collaborate, and Grow with Your Peers.
          </p>
        </>
      }
    >

      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

      <form onSubmit={handleLogin} className="space-y-4">

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold"
        >
          Sign In
        </button>

      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:underline">
          Sign Up
        </Link>
      </p>

    </AuthLayout>
  );
}
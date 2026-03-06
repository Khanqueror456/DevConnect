import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e)=>{
    e.preventDefault();

    try{
      await api.post("/auth/register",{name,email,password});
      navigate("/login");
    }catch(err){
      alert("Registration failed");
    }
  };

  return(
    <AuthLayout
      leftContent={
        <>
          <h1 className="text-3xl font-bold mb-4">
            DevConnect
          </h1>

          <p className="text-gray-400">
            Connect, Collaborate, and Grow with Your Peers.
          </p>
        </>
      }
    >

      <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

      <form onSubmit={handleRegister} className="space-y-4">

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold"
        >
          Sign Up
        </button>

      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>

    </AuthLayout>
  );
}
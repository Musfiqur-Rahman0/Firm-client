import { useState, useContext,  } from "react";
import {useNavigate} from "react-router-dom";
import type { FormEvent } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import type { AuthResponse } from "../types/auth";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post<AuthResponse>(
        "/auth/login",
        form
      );

      console.log("Login response:", res.data);

      login(res?.data);
      navigate("/");

    } catch (err: any) {
        console.log("Login error:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">Login</button>
    </form>
  );
}
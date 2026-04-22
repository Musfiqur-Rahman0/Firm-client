import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent, ChangeEvent } from "react";
import { toast } from "sonner";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange =
    (key: "email" | "password") => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post<AuthResponse>("/auth/login", form);

      login(res.data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
      console.log("Login error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🌱</div>
          <h1 className="auth-brand">UrbanFarm</h1>
          <p className="auth-tagline">
            Connect with urban farmers and grow your own food.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Sign in to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                required
              />
            </div>

            {error && (
              <div className="form-error" style={{ marginBottom: 14 }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Processing..." : "Sign In"}
            </button>
          </form>

          <div className="auth-toggle">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/auth/register")}
              style={{ cursor: "pointer" }}
            >
              Register here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useContext, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import type { AuthResponse } from "../types/auth";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post<{ data: AuthResponse }>(
        "/auth/register",
        form,
      );

      const authData = res.data.data;

      if (authData?.token) {
        login(authData);
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.success("Registered successfully. Please login.");
        navigate("/auth/login");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      toast.error(message);
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
          <p className="auth-tagline">Join thousands of urban farmers today.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h2 className="auth-title">Create account</h2>
          <p className="auth-sub">Start your farming journey</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
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
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <div className="auth-toggle">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

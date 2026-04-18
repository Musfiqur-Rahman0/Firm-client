import React, { useEffect, useState } from "react";
// import { farmApi } from '../services/api';
import demoFarms from "../../public/demoData/data";

import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

function BookingModal({ farm, onClose, onSuccess }: any) {
  const [form, setForm] = useState({ startDate: "", endDate: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Booking farm:", farm);
    // setLoading(true);
    // try {
    //   await farmApi.book(farm.id, form);
    //   showToast('Farm space booked successfully! 🌱', 'success');
    //   onSuccess();
    //   onClose();
    // } catch (err: any) {
    //   showToast(err.message || 'Booking failed', 'error');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Book Farm Space</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div
          style={{
            background: "var(--cream)",
            borderRadius: "var(--radius-md)",
            padding: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 15 }}>
            {farm.farmName || farm.vendorId?.farmName || "Farm Space"}
          </div>
          <div
            style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}
          >
            📍 {farm.location} &nbsp;·&nbsp; 📐 {farm.size}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "var(--forest)",
              marginTop: 8,
            }}
          >
            ৳{farm.price}
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "var(--text-muted)",
              }}
            >
              /month
            </span>
          </div>
        </div>
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                required
                value={form.endDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, endDate: e.target.value }))
                }
                min={form.startDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              rows={3}
              placeholder="Any special requirements?"
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              style={{ resize: "vertical" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddFarmModal({ onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    location: "",
    size: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: any) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  //   const submit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     console.log("Adding farm:", form);
  //     // setLoading(true);
  //     // try {
  //     //   await farmApi.create({ ...form, price: Number(form.price), availability: true });
  //     //   showToast('Farm space listed!', 'success');
  //     //   onSuccess();
  //     //   onClose();
  //     // } catch (err: any) {
  //     //   showToast(err.message || 'Failed to add farm', 'error');
  //     // } finally { setLoading(false); }
  //   };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Farm space listed!");
      onSuccess();
      onClose();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>List a Farm Space</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Location / Address</label>
            <input
              required
              placeholder="e.g. Gulshan, Dhaka"
              value={form.location}
              onChange={set("location")}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Plot Size</label>
              <input
                required
                placeholder="e.g. 50 sqm"
                value={form.size}
                onChange={set("size")}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Monthly Price (৳)</label>
              <input
                required
                type="number"
                placeholder="1500"
                value={form.price}
                onChange={set("price")}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows={3}
              placeholder="Describe your farm space..."
              value={form.description}
              onChange={set("description")}
              style={{ resize: "vertical" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? "Saving..." : "List Farm Space"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const farmEmojis = ["🌾", "🏡", "🌿", "🍃", "🌱", "🪴"];

export default function FarmRental() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { user } = React.useContext(AuthContext);

  const limit = 9;

  const load = async () => {
    setLoading(true);

    // simulate API delay
    setTimeout(() => {
      const filtered = demoFarms.filter((farm) =>
        farm.location.toLowerCase().includes(search.toLowerCase()),
      );

      setFarms(filtered);
      setTotal(filtered.length);
      setLoading(false);
    }, 500);
    // try {
    //   const params = new URLSearchParams({
    //     page: String(page),
    //     limit: String(limit),
    //   });
    //   if (search) params.set("location", search);
    //   const data = await farmApi.list(params.toString());
    //   setFarms(data?.data || data?.farms || data || []);
    //   setTotal(data?.total || 0);
    // } catch {
    //   toast("Failed to load farm spaces", "error");
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    load();
  }, [page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>Farm Spaces 🏡</h1>
            <p>Find and rent garden plots from local urban farmers</p>
          </div>
          {user?.role === "VENDOR" && (
            <button
              className="btn btn-primary"
              onClick={() => setShowAdd(true)}
            >
              + List Your Space
            </button>
          )}
        </div>
      </div>

      <div className="filter-row">
        <div className="search-bar" style={{ flex: 1, maxWidth: 400 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            placeholder="Search by location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-screen">
          <div className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      ) : farms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏡</div>
          <h3>No farm spaces found</h3>
          <p>
            {search
              ? "Try a different location"
              : "No farm spaces are available right now"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid-3">
            {farms.map((farm, i) => (
              <div className="item-card" key={farm.id || i}>
                <div
                  className="item-card-img"
                  style={{
                    background: `linear-gradient(135deg, var(--cream-dark) 0%, var(--sage-light) 100%)`,
                  }}
                >
                  <span style={{ fontSize: "3.5rem" }}>
                    {farmEmojis[i % farmEmojis.length]}
                  </span>
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <span
                      className={`badge ${farm.availability ? "badge-green" : "badge-red"}`}
                    >
                      {farm.availability ? "Available" : "Booked"}
                    </span>
                  </div>
                </div>
                <div className="item-card-body">
                  <div className="item-card-title">
                    {farm.vendorId?.farmName ||
                      farm.farmName ||
                      "Urban Farm Plot"}
                  </div>
                  <div className="item-card-meta">
                    📍 {farm.location} &nbsp;·&nbsp; 📐 {farm.size}
                  </div>
                  <div className="item-card-price">
                    ৳{Number(farm.price).toLocaleString()}
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        color: "var(--text-muted)",
                      }}
                    >
                      /mo
                    </span>
                  </div>
                </div>
                <div className="item-card-footer">
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    Urban farming
                  </span>
                  {farm.availability && user?.role === "CUSTOMER" && (
                    <button
                      className="btn btn-sage btn-sm"
                      onClick={() => setSelected(farm)}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - page) < 3)
                .map((p) => (
                  <button
                    key={p}
                    className={`page-btn ${p === page ? "active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </>
      )}

      {selected && (
        <BookingModal
          farm={selected}
          onClose={() => setSelected(null)}
          onSuccess={load}
        />
      )}
      {showAdd && (
        <AddFarmModal onClose={() => setShowAdd(false)} onSuccess={load} />
      )}
    </div>
  );
}

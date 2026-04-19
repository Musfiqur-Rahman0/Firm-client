import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { demoProducts } from "../../public/demoData/data";
import { marketApi } from "../api/services/apis";

const CATEGORIES = [
  "All",
  "Vegetables",
  "Fruits",
  "Herbs",
  "Seeds",
  "Tools",
  "Organic",
];
const produceEmojis: Record<string, string> = {
  vegetables: "🥬",
  fruits: "🍅",
  herbs: "🌿",
  seeds: "🌱",
  tools: "🪴",
  organic: "🥦",
  default: "🛒",
};

function OrderModal({ item, onClose, onSuccess }: any) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Placing order for", item.name, "Quantity:", qty);
    // setLoading(true);
    // try {
    //   await marketApi.order(item.id, { quantity: qty });
    //   toast(`Ordered ${qty}x ${item.name}! 🛒`, { type: "success" });
    //   onSuccess?.();
    //   onClose();
    // } catch (err: any) {
    //     toast(err.response?.data?.message || "Order failed", { type: "error" });

    // } finally {
    //   setLoading(false);
    // }
    setLoading(true);

    setTimeout(() => {
      toast.success(`Ordered ${qty}x ${item.name}! 🛒`);
      onSuccess?.();
      onClose();
      setLoading(false);
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Place Order</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "4rem", marginBottom: 12 }}>
            {produceEmojis[item.category?.toLowerCase()] ||
              produceEmojis.default}
          </div>
          <h4>{item.name}</h4>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              margin: "6px 0 4px",
            }}
          >
            {item.description}
          </p>
          <p style={{ fontSize: 18, fontWeight: 600, color: "var(--forest)" }}>
            ৳{item.price} each
          </p>
          {item.certificationStatus === "approved" && (
            <span className="badge badge-green" style={{ marginTop: 8 }}>
              ✓ Organic Certified
            </span>
          )}
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">
              Quantity (Available: {item.availableQuantity || "—"})
            </label>
            <input
              type="number"
              min={1}
              max={item.availableQuantity || 999}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              required
            />
          </div>
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "var(--radius-sm)",
              padding: "12px 16px",
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Total
            </span>
            <span
              style={{ fontWeight: 600, fontSize: 16, color: "var(--forest)" }}
            >
              ৳{(item.price * qty).toLocaleString()}
            </span>
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
              {loading ? "Ordering..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddProduceModal({ onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Vegetables",
    availableQuantity: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: any) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Listing produce", form);
    // setLoading(true);
    // try {
    //   await marketApi.create({
    //     ...form,
    //     price: Number(form.price),
    //     availableQuantity: Number(form.availableQuantity),
    //   });
    //   toast("Produce listed!");

    //   onSuccess();
    //   onClose();
    // } catch (err: any) {
    //   toast(err.response?.data?.message || "Failed to list produce");
    // } finally {
    //   setLoading(false);
    // }
    setLoading(true);

    setTimeout(() => {
      toast.success("Produce listed!");
      onSuccess?.();
      onClose();
      setLoading(false);
    }, 700);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>List Produce</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              required
              placeholder="e.g. Fresh Spinach"
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows={2}
              placeholder="Describe your produce..."
              value={form.description}
              onChange={set("description")}
              style={{ resize: "vertical" }}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={form.category} onChange={set("category")}>
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Price (৳)</label>
              <input
                required
                type="number"
                placeholder="120"
                value={form.price}
                onChange={set("price")}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Available Quantity</label>
            <input
              required
              type="number"
              placeholder="50"
              value={form.availableQuantity}
              onChange={set("availableQuantity")}
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
              {loading ? "Listing..." : "List Produce"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { user } = React.useContext(AuthContext);

  const limit = 9;

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search) params.set("name", search);
      if (category !== "All") params.set("category", category);

      const data = await marketApi.list(params.toString());
      // console.log("Loaded data:", data);
      setProducts(data?.data || data?.products || data || []);

      setTotal(data?.total || 0);
    } catch {
      toast("Failed to load products");
    } finally {
      setLoading(false);
      console.log("Products loaded:", products);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, category]);
  useEffect(() => {
    load();
  }, [page, search, category]);

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
            <h1>Marketplace 🛒</h1>
            <p>Fresh, organic produce from certified local farmers</p>
          </div>
          {user?.role === "VENDOR" && (
            <button
              className="btn btn-primary"
              onClick={() => setShowAdd(true)}
            >
              + List Produce
            </button>
          )}
        </div>
      </div>

      <div className="filter-row">
        <div className="search-bar" style={{ flex: 1, maxWidth: 380 }}>
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
            placeholder="Search produce..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 13,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                background: category === c ? "var(--forest)" : "var(--white)",
                color: category === c ? "white" : "var(--text-secondary)",
                borderColor: category === c ? "var(--forest)" : "var(--border)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-screen">
          <div className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>No products found</h3>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <>
          <div className="grid-3">
            {products.map((p, i) => (
              <div className="item-card" key={p.id || i}>
                <div
                  className="item-card-img"
                  style={{
                    background:
                      "linear-gradient(135deg, #EAF3DE 0%, #C0DD97 100%)",
                    fontSize: "3.5rem",
                  }}
                >
                  {produceEmojis[p.category?.toLowerCase()] ||
                    produceEmojis.default}
                  {p.certificationStatus === "approved" && (
                    <div style={{ position: "absolute", top: 10, left: 10 }}>
                      <span
                        className="badge badge-green"
                        style={{ fontSize: 11 }}
                      >
                        ✓ Organic
                      </span>
                    </div>
                  )}
                  {p.availableQuantity !== undefined && (
                    <div style={{ position: "absolute", top: 10, right: 10 }}>
                      <span
                        className={`badge ${p.availableQuantity > 0 ? "badge-sage" : "badge-red"}`}
                        style={{ fontSize: 11 }}
                      >
                        {p.availableQuantity > 0
                          ? `${p.availableQuantity} left`
                          : "Out of stock"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="item-card-body">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      className="badge badge-earth"
                      style={{ fontSize: 11 }}
                    >
                      {p.category}
                    </span>
                  </div>
                  <div className="item-card-title">{p.name}</div>
                  <div className="item-card-meta">
                    {p.description?.slice(0, 60)}
                    {p.description?.length > 60 ? "..." : ""}
                  </div>
                  <div className="item-card-price">
                    ৳{Number(p.price).toLocaleString()}
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        color: "var(--text-muted)",
                      }}
                    >
                      {" "}
                      /unit
                    </span>
                  </div>
                </div>
                <div className="item-card-footer">
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    by {p.vendorId?.farmName || "Local Farmer"}
                  </span>
                  {user?.role === "CUSTOMER" && p.availableQuantity > 0 && (
                    <button
                      className="btn btn-sage btn-sm"
                      onClick={() => setSelected(p)}
                    >
                      Add to Order
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
        <OrderModal
          item={selected}
          onClose={() => setSelected(null)}
          onSuccess={load}
        />
      )}
      {showAdd && (
        <AddProduceModal onClose={() => setShowAdd(false)} onSuccess={load} />
      )}
    </div>
  );
}

import React, { useState } from "react";
import {
  USERS,
  VENDORS,
  PRODUCE,
  RENTAL_SPACES,
  ORDERS,
  VENDOR_REQUESTS,
} from "../data/demo";
import type {
  UserStatus,
  CertStatus,
  OrderStatus,
  SpaceStatus,
} from "../types";

// ── Badge helpers ─────────────────────────────────────────────────────────
function roleBadge(role: string) {
  const cls: Record<string, string> = {
    ADMIN: "badge-admin",
    VENDOR: "badge-vendor",
    CUSTOMER: "badge-customer",
  };
  return <span className={`badge ${cls[role] ?? "badge-admin"}`}>{role}</span>;
}

function statusBadge(s: UserStatus) {
  const cls: Record<UserStatus, string> = {
    ACTIVE: "badge-approved",
    SUSPENDED: "badge-rejected",
    PENDING: "badge-pending",
  };
  return <span className={`badge ${cls[s]}`}>{s}</span>;
}

function certBadge(s: CertStatus) {
  const cls: Record<CertStatus, string> = {
    APPROVED: "badge-approved",
    PENDING: "badge-pending",
    REJECTED: "badge-rejected",
  };
  return <span className={`badge ${cls[s]}`}>{s}</span>;
}

function orderBadge(s: OrderStatus) {
  const cls: Record<OrderStatus, string> = {
    PENDING: "badge-pending",
    CONFIRMED: "badge-confirmed",
    SHIPPED: "badge-shipped",
    DELIVERED: "badge-delivered",
    CANCELLED: "badge-cancelled",
  };
  return <span className={`badge ${cls[s]}`}>{s}</span>;
}

function spaceBadge(s: SpaceStatus) {
  const cls: Record<SpaceStatus, string> = {
    AVAILABLE: "badge-available",
    BOOKED: "badge-booked",
    MAINTENANCE: "badge-maintenance",
  };
  return <span className={`badge ${cls[s]}`}>{s}</span>;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

// ── Users Table ───────────────────────────────────────────────────────────
export const UsersSection: React.FC = () => {
  const [users, setUsers] = useState(USERS);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status:
                u.status === "ACTIVE"
                  ? ("SUSPENDED" as UserStatus)
                  : ("ACTIVE" as UserStatus),
            }
          : u,
      ),
    );
  };

  return (
    <div className="full-panel">
      <div className="panel-header">
        <div className="panel-title">
          <div className="panel-title-icon" style={{ background: "#dbeafe" }}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e40af"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          All Users
          <span
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 999,
              background: "var(--stone-100)",
              color: "var(--stone-600)",
            }}
          >
            {users.length}
          </span>
        </div>
        <button className="panel-action">+ Invite user</button>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="cell-avatar">
                    <div className="mini-avatar">{initials(u.name)}</div>
                    <span className="td-name">{u.name}</span>
                  </div>
                </td>
                <td className="td-mono">{u.email}</td>
                <td>{roleBadge(u.role)}</td>
                <td>{statusBadge(u.status)}</td>
                <td className="td-mono">{u.createdAt}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="tbl-btn">View</button>
                    <button
                      className={`tbl-btn ${u.status === "ACTIVE" ? "tbl-btn-reject" : "tbl-btn-approve"}`}
                      onClick={() => toggleStatus(u.id)}
                    >
                      {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Vendors Table ─────────────────────────────────────────────────────────
export const VendorsSection: React.FC = () => (
  <div className="full-panel">
    <div className="panel-header">
      <div className="panel-title">
        <div className="panel-title-icon" style={{ background: "#d6f2dc" }}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a5228"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </div>
        All Vendors
        <span
          style={{
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 999,
            background: "var(--stone-100)",
            color: "var(--stone-600)",
          }}
        >
          {VENDORS.length}
        </span>
      </div>
    </div>
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Farm</th>
            <th>Location</th>
            <th>Cert status</th>
            <th>Products</th>
            <th>Revenue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {VENDORS.map((v) => (
            <tr key={v.id}>
              <td>
                <div className="cell-avatar">
                  <div className="mini-avatar">{initials(v.name)}</div>
                  <span className="td-name">{v.name}</span>
                </div>
              </td>
              <td>{v.farmName}</td>
              <td className="td-mono" style={{ fontSize: 11 }}>
                {v.location}
              </td>
              <td>{certBadge(v.certStatus)}</td>
              <td className="td-mono">{v.productsCount}</td>
              <td className="td-mono">${v.revenue.toLocaleString()}</td>
              <td>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="tbl-btn">View</button>
                  <button className="tbl-btn tbl-btn-reject">Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── Produce Table ─────────────────────────────────────────────────────────
export const ProduceSection: React.FC = () => {
  const [items, setItems] = useState(PRODUCE);

  const approveCert = (id: string) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, certStatus: "APPROVED" as CertStatus } : p,
      ),
    );
  };
  const rejectCert = (id: string) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, certStatus: "REJECTED" as CertStatus } : p,
      ),
    );
  };

  return (
    <div className="full-panel">
      <div className="panel-header">
        <div className="panel-title">
          <div className="panel-title-icon" style={{ background: "#ccfbf1" }}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#115e59"
              strokeWidth="2"
            >
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          All Produce
          <span
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 999,
              background: "var(--stone-100)",
              color: "var(--stone-600)",
            }}
          >
            {items.length}
          </span>
        </div>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Vendor</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Cert</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td className="td-name">{p.name}</td>
                <td style={{ fontSize: 12 }}>{p.vendorName}</td>
                <td>
                  <span
                    className="badge badge-confirmed"
                    style={{ fontSize: 10 }}
                  >
                    {p.category}
                  </span>
                </td>
                <td className="td-mono">${p.price.toFixed(2)}</td>
                <td className="td-mono">{p.quantity}</td>
                <td>{certBadge(p.certStatus)}</td>
                <td>
                  <span
                    className={`badge ${p.isActive ? "badge-approved" : "badge-rejected"}`}
                  >
                    {p.isActive ? "Yes" : "No"}
                  </span>
                </td>
                <td>
                  {p.certStatus === "PENDING" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="tbl-btn tbl-btn-approve"
                        onClick={() => approveCert(p.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="tbl-btn tbl-btn-reject"
                        onClick={() => rejectCert(p.id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button className="tbl-btn">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Rental Spaces Table ───────────────────────────────────────────────────
export const RentalsSection: React.FC = () => (
  <div className="full-panel">
    <div className="panel-header">
      <div className="panel-title">
        <div className="panel-title-icon" style={{ background: "#d6f2dc" }}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a5228"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
        Rental Spaces
        <span
          style={{
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 999,
            background: "var(--stone-100)",
            color: "var(--stone-600)",
          }}
        >
          {RENTAL_SPACES.length}
        </span>
      </div>
    </div>
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Farm</th>
            <th>Location</th>
            <th>Size</th>
            <th>Price / day</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {RENTAL_SPACES.map((r) => (
            <tr key={r.id}>
              <td className="td-name">{r.farmName}</td>
              <td style={{ fontSize: 12 }}>{r.location}</td>
              <td className="td-mono">{r.size}</td>
              <td className="td-mono">${r.pricePerDay}</td>
              <td>{spaceBadge(r.status)}</td>
              <td>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="tbl-btn">View</button>
                  <button className="tbl-btn tbl-btn-reject">Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── Orders Table ──────────────────────────────────────────────────────────
export const OrdersSection: React.FC = () => (
  <div className="full-panel">
    <div className="panel-header">
      <div className="panel-title">
        <div className="panel-title-icon" style={{ background: "#fef3cd" }}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#92400e"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        Orders
        <span
          style={{
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 999,
            background: "var(--stone-100)",
            color: "var(--stone-600)",
          }}
        >
          {ORDERS.length}
        </span>
      </div>
    </div>
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((o) => (
            <tr key={o.id}>
              <td
                className="td-mono"
                style={{ color: "var(--stone-400)", fontSize: 11 }}
              >
                #{o.id.toUpperCase()}
              </td>
              <td>
                <div className="cell-avatar">
                  <div className="mini-avatar">{initials(o.customerName)}</div>
                  <span className="td-name" style={{ fontWeight: 400 }}>
                    {o.customerName}
                  </span>
                </div>
              </td>
              <td style={{ fontSize: 12 }}>{o.produceName}</td>
              <td style={{ fontSize: 12, color: "var(--stone-400)" }}>
                {o.vendorName}
              </td>
              <td className="td-mono" style={{ fontWeight: 500 }}>
                ${o.amount.toFixed(2)}
              </td>
              <td>{orderBadge(o.status)}</td>
              <td className="td-mono" style={{ fontSize: 11 }}>
                {o.date}
              </td>
              <td>
                <button className="tbl-btn">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── Vendor Requests Table ─────────────────────────────────────────────────
export const RequestsSection: React.FC = () => {
  const [requests, setRequests] = useState(VENDOR_REQUESTS);

  const approve = (id: string) =>
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "APPROVED" as CertStatus } : r,
      ),
    );
  const reject = (id: string) =>
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "REJECTED" as CertStatus } : r,
      ),
    );

  const pending = requests.filter((r) => r.status === "PENDING").length;

  return (
    <div className="full-panel">
      <div className="panel-header">
        <div className="panel-title">
          <div className="panel-title-icon" style={{ background: "#f3e8ff" }}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b21a8"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          Vendor Certification Requests
          {pending > 0 && (
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 999,
                background: "#fee2e2",
                color: "#991b1b",
              }}
            >
              {pending} pending
            </span>
          )}
        </div>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Farm</th>
              <th>Certifying Agency</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="cell-avatar">
                    <div className="mini-avatar">{initials(r.vendorName)}</div>
                    <span className="td-name">{r.vendorName}</span>
                  </div>
                </td>
                <td style={{ fontSize: 12 }}>{r.farmName}</td>
                <td style={{ fontSize: 12 }}>{r.certAgency}</td>
                <td className="td-mono" style={{ fontSize: 11 }}>
                  {r.submittedAt}
                </td>
                <td>{certBadge(r.status)}</td>
                <td>
                  {r.status === "PENDING" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="tbl-btn tbl-btn-approve"
                        onClick={() => approve(r.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="tbl-btn tbl-btn-reject"
                        onClick={() => reject(r.id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: 11, color: "var(--stone-400)" }}>
                      {r.status === "APPROVED" ? "✓ Approved" : "✗ Rejected"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "./dashboard.css";
import type { DashSection } from "./types";
import OverviewSection from "./components/OverviewSection";
import {
  UsersSection,
  VendorsSection,
  ProduceSection,
  RentalsSection,
  OrdersSection,
  RequestsSection,
} from "./components/DataSections";
import { VENDOR_REQUESTS } from "./data/demo";

// ── Nav items config ──────────────────────────────────────────────────────
interface NavItem {
  id: DashSection;
  label: string;
  badge?: number;
  urgent?: boolean;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "users",
    label: "Users",
    badge: 186,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "vendors",
    label: "Vendors",
    badge: 10,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "produce",
    label: "Produce",
    badge: 8,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 2C8.5 2 5 5.5 5 9.5c0 5.5 7 12.5 7 12.5s7-7 7-12.5C19 5.5 15.5 2 12 2z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "rentals",
    label: "Rental Spaces",
    badge: 6,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    id: "orders",
    label: "Orders",
    badge: 7,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: "requests",
    label: "Cert Requests",
    badge: VENDOR_REQUESTS.filter((r) => r.status === "PENDING").length,
    urgent: true,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const SECTION_TITLES: Record<DashSection, { title: string; sub: string }> = {
  overview: { title: "Dashboard overview", sub: "Platform health at a glance" },
  users: { title: "User management", sub: "All registered platform users" },
  vendors: {
    title: "Vendor management",
    sub: "Active urban farmers on the platform",
  },
  produce: { title: "Produce listings", sub: "All marketplace products" },
  rentals: { title: "Rental spaces", sub: "Farm plots available for booking" },
  orders: { title: "Order management", sub: "Customer purchase history" },
  requests: {
    title: "Certification requests",
    sub: "Vendor organic certification submissions",
  },
};

// ── Tab bar (for overview quick-nav) ─────────────────────────────────────
const TABS: { id: DashSection; label: string; count: number }[] = [
  { id: "overview", label: "Overview", count: 0 },
  { id: "users", label: "Users", count: 186 },
  { id: "vendors", label: "Vendors", count: 10 },
  { id: "produce", label: "Produce", count: 8 },
  { id: "rentals", label: "Rentals", count: 6 },
  { id: "orders", label: "Orders", count: 7 },
  { id: "requests", label: "Requests", count: 2 },
];

// ── Main Component ────────────────────────────────────────────────────────
export const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState<DashSection>("overview");

  const { title, sub } = SECTION_TITLES[section];

  const renderSection = () => {
    switch (section) {
      case "overview":
        return <OverviewSection />;
      case "users":
        return <UsersSection />;
      case "vendors":
        return <VendorsSection />;
      case "produce":
        return <ProduceSection />;
      case "rentals":
        return <RentalsSection />;
      case "orders":
        return <OrdersSection />;
      case "requests":
        return <RequestsSection />;
    }
  };

  return (
    <div className="dash-shell">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="sidebar">
        <a href="#" className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a8e0b3"
              strokeWidth="1.8"
            >
              <path d="M12 2C8.5 2 5 5.5 5 9.5c0 5.5 7 12.5 7 12.5s7-7 7-12.5C19 5.5 15.5 2 12 2z" />
              <path d="M12 7v6M9 10l3-3 3 3" />
            </svg>
          </div>
          <span className="sidebar-logo-text">UrbanFarm</span>
          <span className="sidebar-logo-badge">Admin</span>
        </a>

        <div className="sidebar-section-label">Navigation</div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item${section === item.id ? " active" : ""}`}
              onClick={() => setSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`nav-badge${item.urgent ? " urgent" : ""}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-card">
            <div className="admin-avatar">PA</div>
            <div className="admin-info">
              <div className="admin-info-name">Platform Admin</div>
              <div className="admin-info-role">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="dash-main">
        {/* Topbar */}
        <header className="topbar">
          <div>
            <div className="topbar-title">{title}</div>
            <div className="topbar-sub">{sub}</div>
          </div>
          <div className="topbar-right">
            <span className="topbar-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <button className="topbar-notif">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="notif-dot" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">
          {/* Section tabs */}
          <div className="section-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`section-tab${section === t.id ? " active" : ""}`}
                onClick={() => setSection(t.id)}
              >
                <span>{t.label}</span>
                {t.count > 0 && <span className="tab-count">{t.count}</span>}
              </button>
            ))}
          </div>

          {/* Dynamic section */}
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

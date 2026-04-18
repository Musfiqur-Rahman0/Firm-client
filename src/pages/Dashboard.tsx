import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { dashboardApi, marketApi, farmApi, plantApi } from '../services/api';

function QuickStat({ label, value, sub, color }: any) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function ActivityItem({ icon, title, desc, time }: any) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 0px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--cream-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{desc}</div>
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {time}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    farms: 0,
    products: 0,
    orders: 0,
    plants: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    // const load = async () => {
    //   try {
    //     const [farmsData, productsData, plantsData] = await Promise.allSettled([
    //       farmApi.list('limit=3'),
    //       marketApi.list('limit=3'),
    //       plantApi.list(),
    //     ]);
    //     if (productsData.status === 'fulfilled') setRecentProducts((productsData.value as any)?.data?.slice(0, 3) || (productsData.value as any)?.slice(0, 3) || []);
    //     setStats({
    //       farms: (farmsData.status === 'fulfilled' ? (farmsData.value as any)?.total || 0 : 0),
    //       products: (productsData.status === 'fulfilled' ? (productsData.value as any)?.total || 0 : 0),
    //       orders: 0,
    //       plants: (plantsData.status === 'fulfilled' ? ((plantsData.value as any)?.data?.length || (plantsData.value as any)?.length || 0) : 0),
    //     });
    //   } catch (_) {} finally { setLoading(false); }
    // };
    // load();
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>
          {greeting}, {user?.name?.split(" ")[0]} 🌿
        </h1>
        <p>Here's what's growing on your platform today.</p>
      </div>

      <div className="stats-grid">
        <QuickStat
          label="Farm Spaces"
          value={loading ? "—" : stats.farms}
          sub="Available plots"
          color="green"
        />
        <QuickStat
          label="Produce Items"
          value={loading ? "—" : stats.products}
          sub="In marketplace"
          color="earth"
        />
        <QuickStat
          label="My Plants"
          value={loading ? "—" : stats.plants}
          sub="Being tracked"
          color="forest"
        />
        <QuickStat
          label="My Orders"
          value={loading ? "—" : stats.orders}
          sub="This month"
          color="terra"
        />
      </div>

      <div className="grid-2" style={{ gap: 24 }}>
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <h3 style={{ fontSize: "1.1rem" }}>Recent Activity</h3>
          </div>
          <ActivityItem
            icon="🌱"
            title="Platform Ready"
            desc="Your UrbanFarm account is active"
            time="Now"
          />
          <ActivityItem
            icon="🏡"
            title="Farm spaces available"
            desc="Browse and rent local plots"
            time="Today"
          />
          <ActivityItem
            icon="🛒"
            title="Marketplace open"
            desc="Fresh organic produce listed"
            time="Today"
          />
          <ActivityItem
            icon="💬"
            title="Community active"
            desc="Join the conversation"
            time="Today"
          />
        </div>

        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <h3 style={{ fontSize: "1.1rem" }}>Quick Actions</h3>
          </div>
          {[
            {
              icon: "🏡",
              label: "Browse Farm Spaces",
              sub: "Find a plot near you",
              path: "/farms",
              color: "var(--sage)",
            },
            {
              icon: "🛒",
              label: "Shop Marketplace",
              sub: "Buy fresh organic produce",
              path: "/marketplace",
              color: "var(--earth-light)",
            },
            {
              icon: "🌿",
              label: "Track My Plants",
              sub: "Monitor growth & health",
              path: "/plants",
              color: "var(--forest-light)",
            },
            {
              icon: "💬",
              label: "Community Forum",
              sub: "Share tips & knowledge",
              path: "/community",
              color: "var(--terracotta)",
            },
          ].map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                width: "100%",
                padding: "12px 14px",
                background: "var(--cream)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                marginBottom: 10,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--cream-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--cream)")
              }
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  border: "1px solid var(--border)",
                }}
              >
                {action.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--forest)",
                  }}
                >
                  {action.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {action.sub}
                </div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  color: "var(--text-muted)",
                  fontSize: 18,
                }}
              >
                ›
              </div>
            </button>
          ))}
        </div>
      </div>

      {user?.role === "VENDOR" && (
        <div
          className="card"
          style={{
            marginTop: 24,
            background:
              "linear-gradient(135deg, var(--forest) 0%, var(--forest-light) 100%)",
            color: "white",
            border: "none",
          }}
        >
          <h3 style={{ color: "var(--cream)", marginBottom: 8 }}>
            Vendor Portal
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            Manage your farm listings, produce, and certifications from here.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              className="btn"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onClick={() => navigate("/farms")}
            >
              + Add Farm Space
            </button>
            <button
              className="btn"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onClick={() => navigate("/marketplace")}
            >
              + List Produce
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

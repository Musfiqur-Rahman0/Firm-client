import React from "react";
import { BarChart, DonutChart } from "./Charts";
import {
  REVENUE_CHART,
  ORDERS_CHART,
  CATEGORY_DIST,
  ACTIVITY,
} from "../data/demo";
import "../dashboard.css";

// ── Stat Card ─────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  trend: string;
  up: boolean;
  delay: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBg,
  label,
  value,
  trend,
  up,
  delay,
}) => (
  <div className="stat-card" style={{ animationDelay: `${delay}s` }}>
    <div className="stat-card-top">
      <div className="stat-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <span className={`stat-trend ${up ? "trend-up" : "trend-down"}`}>
        {trend}
      </span>
    </div>
    <div>
      <div className="stat-num">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
);

// ── Activity feed ─────────────────────────────────────────────────────────
const ActivityTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const map: Record<
    string,
    { bg: string; color: string; icon: React.ReactNode }
  > = {
    user_joined: {
      bg: "#dbeafe",
      color: "#1e40af",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    order_placed: {
      bg: "#d6f2dc",
      color: "#1a5228",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      ),
    },
    cert_submitted: {
      bg: "#fef3cd",
      color: "#92400e",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    space_booked: {
      bg: "#ccfbf1",
      color: "#115e59",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    vendor_approved: {
      bg: "#d6f2dc",
      color: "#1a5228",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
  };
  const m = map[type] ?? map["order_placed"];
  return (
    <div
      className="activity-avatar"
      style={{ background: m.bg, color: m.color }}
    >
      {m.icon}
    </div>
  );
};

// ── Overview Section ──────────────────────────────────────────────────────
const OverviewSection: React.FC = () => (
  <>
    {/* Stat cards */}
    <div className="stat-cards">
      <StatCard
        delay={0.05}
        iconBg="#dbeafe"
        up
        trend="↑ 12%"
        label="Total users"
        value="186"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e40af"
            strokeWidth="1.6"
          >
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
        }
      />
      <StatCard
        delay={0.1}
        iconBg="#d6f2dc"
        up
        trend="↑ 8%"
        label="Active vendors"
        value="10"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a5228"
            strokeWidth="1.6"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
      />
      <StatCard
        delay={0.15}
        iconBg="#fef3cd"
        up
        trend="↑ 23%"
        label="Monthly revenue"
        value="$6,340"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#92400e"
            strokeWidth="1.6"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        }
      />
      <StatCard
        delay={0.2}
        iconBg="#f3e8ff"
        up={false}
        trend="↓ 3%"
        label="Pending requests"
        value="2"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b21a8"
            strokeWidth="1.6"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        }
      />
    </div>

    {/* Charts + activity */}
    <div className="panels-grid">
      {/* Revenue chart */}
      <div className="panel" style={{ animationDelay: "0.25s" }}>
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
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            Revenue (6 months)
          </div>
          <button className="panel-action">Export</button>
        </div>
        <div className="panel-body">
          <BarChart
            data={REVENUE_CHART}
            color="#1a5228"
            prefix="$"
            label="This month"
          />
        </div>
      </div>

      {/* Orders chart */}
      <div className="panel" style={{ animationDelay: "0.3s" }}>
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
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
              </svg>
            </div>
            Orders (6 months)
          </div>
          <button className="panel-action">Export</button>
        </div>
        <div className="panel-body">
          <BarChart data={ORDERS_CHART} color="#3b82f6" label="This month" />
        </div>
      </div>

      {/* Activity feed */}
      <div className="panel" style={{ animationDelay: "0.35s" }}>
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            Live activity
          </div>
          <button className="panel-action">View all</button>
        </div>
        <div className="panel-body" style={{ padding: "0.5rem 1.25rem" }}>
          <div className="activity-list">
            {ACTIVITY.map((a) => (
              <div key={a.id} className="activity-item">
                <ActivityTypeIcon type={a.type} />
                <span className="activity-msg">{a.message}</span>
                <span className="activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Category distribution */}
    <div
      className="panel"
      style={{ animationDelay: "0.4s", marginBottom: "1.5rem" }}
    >
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 010 20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          Produce by category
        </div>
      </div>
      <div className="panel-body">
        <DonutChart data={CATEGORY_DIST} />
      </div>
    </div>
  </>
);

export default OverviewSection;

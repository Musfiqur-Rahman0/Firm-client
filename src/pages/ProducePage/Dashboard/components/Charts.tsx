import React from "react";
import type { ChartPoint } from "../types";

// ── Colour palette for bars / donut segments ──────────────────────────────
const DONUT_COLORS = [
  "#2e8b42",
  "#5cb870",
  "#14b8a6",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
];

// ── Bar Chart ─────────────────────────────────────────────────────────────
interface BarChartProps {
  data: ChartPoint[];
  color: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  color,
  prefix = "",
  suffix = "",
  label,
}) => {
  const max = Math.max(...data.map((d) => d.value));
  const total = data[data.length - 1]?.value ?? 0;

  return (
    <div>
      <div className="bar-chart">
        {data.map((d, i) => {
          const pct = max > 0 ? (d.value / max) * 68 : 0;
          return (
            <div
              key={d.label}
              className="bar-col"
              title={`${d.label}: ${prefix}${d.value.toLocaleString()}${suffix}`}
            >
              <div
                className="bar"
                style={{
                  height: `${pct}px`,
                  background: i === data.length - 1 ? color : `${color}55`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
              <span className="bar-label">{d.label}</span>
            </div>
          );
        })}
      </div>
      <div className="chart-meta">
        <div>
          <div className="chart-total">
            {prefix}
            {total.toLocaleString()}
            {suffix}
          </div>
          <div className="chart-total-label">{label}</div>
        </div>
        <div
          style={{ fontSize: 11, color: "var(--green-600)", fontWeight: 500 }}
        >
          ↑{" "}
          {Math.round(
            ((data[data.length - 1]?.value ?? 0) /
              (data[data.length - 2]?.value ?? 1) -
              1) *
              100,
          )}
          % vs last month
        </div>
      </div>
    </div>
  );
};

// ── Donut Chart (SVG) ─────────────────────────────────────────────────────
interface DonutChartProps {
  data: ChartPoint[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 42;
  const cx = 54;
  const cy = 54;
  const circ = 2 * Math.PI * r;

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const pct = d.value / total;
    const dash = pct * circ;
    const offset = circ - cumulative * circ;
    cumulative += pct;
    return { ...d, dash, offset, color: DONUT_COLORS[i % DONUT_COLORS.length] };
  });

  return (
    <div className="donut-wrap">
      <svg
        width="108"
        height="108"
        viewBox="0 0 108 108"
        style={{ flexShrink: 0 }}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--stone-100)"
          strokeWidth="12"
        />
        {/* Segments */}
        {segments.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="12"
            strokeDasharray={`${s.dash} ${circ - s.dash}`}
            strokeDashoffset={s.offset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        ))}
        {/* Centre text */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontFamily="DM Serif Display, serif"
          fontSize="16"
          fill="var(--stone-900)"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontFamily="DM Sans, sans-serif"
          fontSize="9"
          fill="var(--stone-400)"
        >
          products
        </text>
      </svg>
      <div className="donut-legend">
        {segments.map((s) => (
          <div key={s.label} className="legend-item">
            <div className="legend-dot" style={{ background: s.color }} />
            <span>{s.label}</span>
            <span className="legend-pct">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

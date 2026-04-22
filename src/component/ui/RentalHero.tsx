import React from "react";

interface HeroProps {
  query: string;
  onQueryChange: (q: string) => void;
}

interface StatsBarProps {
  total: number;
  available: number;
  avgPrice: number;
}

export const RentalHero: React.FC<HeroProps> = ({ query, onQueryChange }) => (
  <div
    style={{
      background: "#0d2e17",
      padding: "4rem 2rem 3rem",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(92,184,112,0.12) 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, rgba(46,139,66,0.08) 0%, transparent 50%)
      `,
      }}
    />
    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#5cb870",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 20,
            height: 1,
            background: "#5cb870",
            display: "inline-block",
          }}
        />
        Garden space rentals
      </div>

      <h1
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "#fff",
          lineHeight: 1.15,
          marginBottom: "1rem",
          letterSpacing: "-0.5px",
        }}
      >
        Find your perfect
        <br />
        <em style={{ fontStyle: "italic", color: "#a8e0b3" }}>urban plot</em>
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "#a8e0b3",
          maxWidth: 480,
          fontWeight: 300,
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        Browse certified organic farm spaces available for rent across the city.
        Grow your own food, your own way.
      </p>

      <div
        style={{
          background: "#fff",
          borderRadius: 999,
          padding: "6px 6px 6px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          maxWidth: 600,
          border: "1px solid #e5e4de",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a8a79e"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by farm name or city..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#1c1c18",
            background: "transparent",
          }}
        />
        <button
          style={{
            background: "#1a5228",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: 16,
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Search
        </button>
      </div>
    </div>
  </div>
);

export const StatsBar: React.FC<StatsBarProps> = ({
  total,
  available,
  avgPrice,
}) => {
  const stats = [
    { label: "Total spaces", value: String(total) },
    { label: "Available now", value: String(available) },
    { label: "Avg. per day", value: `$${avgPrice}` },
    { label: "Cities covered", value: "5" },
  ];

  return (
    <div style={{ background: "#1a5228", padding: "0 2rem" }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0 }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "1rem 2.5rem 1rem 0",
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderRight:
                i < stats.length - 1
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "none",
              marginRight: i < stats.length - 1 ? "2.5rem" : 0,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: "#fff",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#a8e0b3", fontWeight: 300 }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

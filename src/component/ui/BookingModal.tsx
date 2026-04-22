import React from "react";
import { BookingStep, RentalSpace } from "../types";
import { BookingErrors } from "../hooks/useBooking";

interface BookingModalProps {
  isOpen: boolean;
  space: RentalSpace | null;
  step: BookingStep;
  form: {
    startDate: string;
    endDate: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  errors: BookingErrors;
  bookingRef: string;
  nights: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSetField: <
    K extends "startDate" | "endDate" | "name" | "email" | "phone" | "notes",
  >(
    key: K,
    value: string,
  ) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e5e4de",
  borderRadius: 10,
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14,
  color: "#1c1c18",
  background: "#fafaf9",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#a8a79e",
  marginBottom: 6,
};

function fmtDate(d: string): string {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Stepper ──────────────────────────────────────────────────────────────────
const Stepper: React.FC<{ step: BookingStep }> = ({ step }) => {
  const steps = ["Dates", "Details", "Confirm"];
  const current = step === "success" ? 4 : (step as number);

  return (
    <div
      style={{
        display: "flex",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #e5e4de",
      }}
    >
      {steps.map((label, i) => {
        const n = i + 1;
        const isActive = current === n;
        const isDone = current > n;
        return (
          <div
            key={label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {i < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 13,
                  left: "58%",
                  width: "84%",
                  height: 1,
                  background: isDone ? "#5cb870" : "#e5e4de",
                  transition: "background 0.3s",
                }}
              />
            )}
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 500,
                border: `1px solid ${isActive ? "#1a5228" : isDone ? "#5cb870" : "#e5e4de"}`,
                background: isActive ? "#1a5228" : isDone ? "#d6f2dc" : "#fff",
                color: isActive ? "#fff" : isDone ? "#1a5228" : "#a8a79e",
                transition: "all 0.2s",
              }}
            >
              {isDone ? (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                n
              )}
            </div>
            <div
              style={{
                fontSize: 11,
                marginTop: 4,
                textAlign: "center",
                color: isActive ? "#1c1c18" : isDone ? "#2e8b42" : "#a8a79e",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Summary row helper ────────────────────────────────────────────────────────
const SRow: React.FC<{ label: string; value: string; large?: boolean }> = ({
  label,
  value,
  large,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: large ? 15 : 13,
      padding: "4px 0",
      gap: 8,
    }}
  >
    <span style={{ color: "#6b6a62" }}>{label}</span>
    <span style={{ color: "#1c1c18", fontWeight: 500, textAlign: "right" }}>
      {value}
    </span>
  </div>
);

// ── Main Modal ────────────────────────────────────────────────────────────────
export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  space,
  step,
  form,
  errors,
  bookingRef,
  nights,
  total,
  onClose,
  onNext,
  onPrev,
  onSetField,
}) => {
  if (!isOpen || !space) return null;

  const today = new Date().toISOString().split("T")[0];
  const isSuccess = step === "success";

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(13,46,23,0.45)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid #e5e4de",
          animation: "modalIn 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 1.5rem 1rem",
            borderBottom: "1px solid #e5e4de",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 20,
                color: "#1c1c18",
              }}
            >
              {isSuccess ? "Booking confirmed!" : "Book rental space"}
            </div>
            {!isSuccess && (
              <div style={{ fontSize: 13, color: "#6b6a62", marginTop: 2 }}>
                {space.farm} · {space.location}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              border: "1px solid #e5e4de",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b6a62",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Stepper */}
        {!isSuccess && <Stepper step={step} />}

        {/* Body */}
        <div style={{ padding: "1.5rem" }}>
          {/* Step 1 — Dates */}
          {step === 1 && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: "1rem",
                }}
              >
                {(["startDate", "endDate"] as const).map((field) => (
                  <div key={field}>
                    <label style={labelStyle}>
                      {field === "startDate" ? "Start date" : "End date"}
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form[field]}
                      onChange={(e) => onSetField(field, e.target.value)}
                      style={{
                        ...inputStyle,
                        borderColor: errors[field] ? "#dc2626" : "#e5e4de",
                      }}
                    />
                    {errors[field] && (
                      <div
                        style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}
                      >
                        {errors[field]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "#f0faf2",
                  border: "1px solid #d6f2dc",
                  borderRadius: 10,
                  padding: "0.75rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: 44,
                }}
              >
                <span style={{ fontSize: 13, color: "#1a5228" }}>
                  {nights > 0
                    ? `${nights} day${nights > 1 ? "s" : ""} × $${space.price}/day`
                    : "Select dates to see total"}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 20,
                    color: "#1a5228",
                  }}
                >
                  {nights > 0 ? `$${total.toFixed(2)}` : "—"}
                </span>
              </div>
            </div>
          )}

          {/* Step 2 — Details */}
          {step === 2 && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: "1rem",
                }}
              >
                {(["name", "email"] as const).map((field) => (
                  <div key={field}>
                    <label style={labelStyle}>
                      {field === "name" ? "Full name" : "Email"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder={
                        field === "name" ? "Your name" : "you@example.com"
                      }
                      value={form[field]}
                      onChange={(e) => onSetField(field, e.target.value)}
                      style={{
                        ...inputStyle,
                        borderColor: errors[field] ? "#dc2626" : "#e5e4de",
                      }}
                    />
                    {errors[field] && (
                      <div
                        style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}
                      >
                        {errors[field]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => onSetField("phone", e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Notes for vendor (optional)</label>
                <textarea
                  placeholder="Any questions or special requirements..."
                  value={form.notes}
                  onChange={(e) => onSetField("notes", e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                />
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div>
              {[
                {
                  title: "Booking details",
                  rows: [
                    { label: "Space", value: `${space.farm} — ${space.size}` },
                    { label: "Location", value: space.location },
                    { label: "Check-in", value: fmtDate(form.startDate) },
                    { label: "Check-out", value: fmtDate(form.endDate) },
                    {
                      label: "Duration",
                      value: `${nights} day${nights !== 1 ? "s" : ""}`,
                    },
                    { label: "Rate", value: `$${space.price} / day` },
                  ],
                  total: `$${total.toFixed(2)}`,
                },
              ].map((block) => (
                <div
                  key={block.title}
                  style={{
                    background: "#fafaf9",
                    border: "1px solid #e5e4de",
                    borderRadius: 10,
                    padding: "1rem 1.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#a8a79e",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {block.title}
                  </div>
                  {block.rows.map((r) => (
                    <SRow key={r.label} label={r.label} value={r.value} />
                  ))}
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #e5e4de",
                      margin: "8px 0",
                    }}
                  />
                  <SRow label="Total" value={block.total} large />
                </div>
              ))}
              <div
                style={{
                  background: "#fafaf9",
                  border: "1px solid #e5e4de",
                  borderRadius: 10,
                  padding: "1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#a8a79e",
                    marginBottom: "0.75rem",
                  }}
                >
                  Your details
                </div>
                <SRow label="Name" value={form.name} />
                <SRow label="Email" value={form.email} />
                {form.phone && <SRow label="Phone" value={form.phone} />}
                {form.notes && <SRow label="Notes" value={form.notes} />}
              </div>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div style={{ textAlign: "center", padding: "1rem 0 0.5rem" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#d6f2dc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2e8b42"
                  strokeWidth="2.2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: "#1c1c18",
                  marginBottom: 6,
                }}
              >
                Booking confirmed!
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#6b6a62",
                  fontWeight: 300,
                  marginBottom: "1.5rem",
                }}
              >
                Your space has been reserved. A confirmation email will be sent
                to <strong style={{ color: "#1c1c18" }}>{form.email}</strong>
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  background: "#f4f4f0",
                  border: "1px solid #e5e4de",
                  borderRadius: 10,
                  padding: "8px 20px",
                  display: "inline-block",
                  color: "#1c1c18",
                  letterSpacing: "0.05em",
                  marginBottom: "1.5rem",
                }}
              >
                {bookingRef}
              </div>
              <br />
              <button
                onClick={onClose}
                style={{
                  background: "#1a5228",
                  color: "#fff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: 10,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid #e5e4de",
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            {step !== 1 && (
              <button
                onClick={onPrev}
                style={{
                  padding: "10px 20px",
                  border: "1px solid #e5e4de",
                  borderRadius: 10,
                  background: "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#6b6a62",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            )}
            <button
              onClick={onNext}
              style={{
                padding: "10px 24px",
                border: "none",
                borderRadius: 10,
                background: "#1a5228",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {step === 3 ? "Confirm booking" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

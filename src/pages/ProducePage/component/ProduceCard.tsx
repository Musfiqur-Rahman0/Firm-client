import React from "react";
// import { Produce } from '../types';
import { CATEGORY_COLORS, CARD_PATTERNS } from "../data/produce";
import type { Produce } from "../types";

interface ProduceCardProps {
  produce: Produce;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

const CERT_LABEL: Record<Produce["certificationStatus"], string> = {
  APPROVED: "Approved",
  PENDING: "Pending",
  REJECTED: "Rejected",
};

const CERT_CLASS: Record<Produce["certificationStatus"], string> = {
  APPROVED: "badge badge-cert-approved",
  PENDING: "badge badge-cert-pending",
  REJECTED: "badge badge-cert-rejected",
};

export const ProduceCard: React.FC<ProduceCardProps> = ({
  produce,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  const [c1, c2] = CARD_PATTERNS[index % CARD_PATTERNS.length];
  const catColor = CATEGORY_COLORS[produce.category];

  return (
    <div
      className={`produce-card${!produce.isActive ? " inactive" : ""}`}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {/* Image area */}
      <div className="card-img-area">
        <svg
          className="card-img-svg"
          viewBox="0 0 320 140"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="320" height="140" fill={c1} />
          <circle cx="40" cy="30" r="70" fill={c2} fillOpacity="0.35" />
          <circle cx="280" cy="110" r="90" fill={c2} fillOpacity="0.2" />
          <circle cx="160" cy="70" r="30" fill={c2} fillOpacity="0.25" />
          {/* Leaf icon */}
          <g
            transform="translate(144, 54)"
            stroke={catColor.text}
            strokeOpacity="0.5"
            fill="none"
            strokeWidth="1.4"
          >
            <path d="M16 2C8 2 2 9 2 16c0 7 6 14 14 14s14-7 14-14C30 9 24 2 16 2z" />
            <path d="M16 2v28M8 10c4 2 8 6 8 6M24 10c-4 2-8 6-8 6" />
          </g>
        </svg>

        <div className="card-badges">
          <span
            className="badge badge-category"
            style={{
              background: catColor.bg,
              color: catColor.text,
              border: `1px solid ${catColor.border}`,
            }}
          >
            {produce.category}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-end",
            }}
          >
            <span className={CERT_CLASS[produce.certificationStatus]}>
              {CERT_LABEL[produce.certificationStatus]}
            </span>
            {!produce.isActive && (
              <span className="badge badge-inactive">Inactive</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-name">{produce.name}</div>
        <div className="card-desc">{produce.description}</div>
        <div className="card-meta-row">
          <div className="card-meta-item">
            Qty: <strong>{produce.availableQuantity}</strong>
          </div>
          <div className="card-meta-item">
            Updated:{" "}
            <strong>
              {new Date(produce.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </strong>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="card-price">
          ${produce.price.toFixed(2)}
          <span> / unit</span>
        </div>
        <div className="card-actions">
          <button
            className={`toggle-btn${produce.isActive ? " active" : ""}`}
            onClick={() => onToggleActive(produce.id)}
            title={produce.isActive ? "Deactivate" : "Activate"}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {produce.isActive ? (
                <>
                  <path d="M18.36 6.64A9 9 0 1 1 5.64 5.64" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </>
              )}
            </svg>
            {produce.isActive ? "Active" : "Inactive"}
          </button>

          <button
            className="action-btn action-btn-edit"
            onClick={() => onEdit(produce.id)}
            title="Edit"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          <button
            className="action-btn action-btn-delete"
            onClick={() => onDelete(produce.id)}
            title="Delete"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

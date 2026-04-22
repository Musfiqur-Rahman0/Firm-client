import React from "react";
import type { ModalMode, ProduceFormData, ProduceCategory } from "../types";
import { CATEGORIES } from "../data/produce";

interface ProduceModalProps {
  mode: ModalMode;
  form: ProduceFormData;
  errors: Partial<Record<keyof ProduceFormData, string>>;
  onSetField: <K extends keyof ProduceFormData>(
    key: K,
    value: ProduceFormData[K],
  ) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const ProduceModal: React.FC<ProduceModalProps> = ({
  mode,
  form,
  errors,
  onSetField,
  onSubmit,
  onClose,
}) => {
  if (!mode) return null;

  const isEdit = mode === "edit";

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {isEdit ? "Edit produce" : "Add new produce"}
            </div>
            <div className="modal-sub">
              {isEdit
                ? "Update the details of your listing"
                : "Fill in the details to list a new product"}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Product name</label>
            <input
              type="text"
              className={`form-input${errors.name ? " error" : ""}`}
              placeholder="e.g. Organic Cherry Tomatoes"
              value={form.name}
              onChange={(e) => onSetField("name", e.target.value)}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className={`form-textarea${errors.description ? " error" : ""}`}
              placeholder="Describe your produce — how it's grown, flavour profile, etc."
              value={form.description}
              onChange={(e) => onSetField("description", e.target.value)}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          {/* Category + Price row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={form.category}
                onChange={(e) =>
                  onSetField("category", e.target.value as ProduceCategory)
                }
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price per unit ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`form-input${errors.price ? " error" : ""}`}
                placeholder="0.00"
                value={form.price || ""}
                onChange={(e) =>
                  onSetField("price", parseFloat(e.target.value) || 0)
                }
              />
              {errors.price && (
                <span className="form-error">{errors.price}</span>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label className="form-label">Available quantity</label>
            <input
              type="number"
              min="0"
              step="1"
              className={`form-input${errors.availableQuantity ? " error" : ""}`}
              placeholder="0"
              value={form.availableQuantity || ""}
              onChange={(e) =>
                onSetField("availableQuantity", parseInt(e.target.value) || 0)
              }
            />
            {errors.availableQuantity && (
              <span className="form-error">{errors.availableQuantity}</span>
            )}
            <span className="form-hint">
              Set to 0 if the item is temporarily out of stock.
            </span>
          </div>

          {/* Active toggle */}
          <div className="active-toggle-row">
            <div>
              <div className="active-toggle-label">Active listing</div>
              <div className="active-toggle-sub">
                Active products appear in the marketplace for customers to buy.
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => onSetField("isActive", e.target.checked)}
              />
              <span className="toggle-track" />
            </label>
          </div>

          {/* Cert note on create */}
          {!isEdit && (
            <div
              style={{
                padding: "10px 14px",
                background: "#fef3cd",
                border: "1px solid #fcd34d",
                borderRadius: 10,
                fontSize: 13,
                color: "#92400e",
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                style={{ flexShrink: 0, marginTop: 1 }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>
                New listings start with <strong>Pending</strong> certification
                status and will be reviewed by the platform admin before
                appearing publicly.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onSubmit}>
            {isEdit ? "Save changes" : "Create listing"}
          </button>
        </div>
      </div>
    </div>
  );
};

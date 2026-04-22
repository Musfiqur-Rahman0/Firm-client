import React from "react";
import type { Produce } from "../types";

interface DeleteConfirmModalProps {
  produce: Produce | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  produce,
  onConfirm,
  onCancel,
}) => {
  if (!produce) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal delete-modal">
        <div className="delete-modal-body">
          <div className="delete-icon-wrap" style={{ margin: "0 auto 1rem" }}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="1.8"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </div>
          <div className="delete-modal-title">Delete this listing?</div>
          <div className="delete-modal-sub" style={{ marginTop: 8 }}>
            You're about to permanently delete{" "}
            <strong style={{ color: "#1c1c18" }}>{produce.name}</strong>. This
            action cannot be undone.
          </div>
        </div>
        <div className="modal-footer" style={{ justifyContent: "center" }}>
          <button className="btn-secondary" onClick={onCancel}>
            Keep listing
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Yes, delete it
          </button>
        </div>
      </div>
    </div>
  );
};

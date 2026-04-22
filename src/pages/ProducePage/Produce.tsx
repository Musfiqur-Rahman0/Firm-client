import React, { useEffect } from "react";
import "./produce.css";
import { useProduce } from "./hooks/useProduce";
import { CATEGORIES } from "./data/produce";
import { ProduceCard } from "./component/ProduceCard";
import { ProduceModal } from "./component/ProduceModal";
import { DeleteConfirmModal } from "./component/DeleteConfrimModal";

export const ProducePage: React.FC = () => {
  const {
    items,
    filtered,
    stats,
    filters,
    setFilterField,
    clearFilters,
    modalMode,
    form,
    formErrors,
    setFormField,
    openCreate,
    openEdit,
    closeModal,
    submitForm,
    deleteId,
    confirmDelete,
    cancelDelete,
    executeDelete,
    toggleActive,
    toast,
  } = useProduce();

  const categoryRef = React.useRef<HTMLDivElement>(null);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (ref: React.RefObject<HTMLDivElement>) => {
    return (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log("Clicked outside");
        ref.current.classList.add("close");
      } else {
        setTimeout(() => {
          console.log("Clicked inside");
          ref.current?.classList.add("close");
        }, 250);
      }
    };
  };

  const handleDropdownOpen = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.classList.remove("close");
  };

  useEffect(() => {
    const Categorylistner = handleClickOutside(categoryRef);
    const Sortlistner = handleClickOutside(sortRef);
    document.addEventListener("mousedown", Categorylistner);
    document.addEventListener("mousedown", Sortlistner);

    return () => {
      document.removeEventListener("mousedown", Categorylistner);
      document.removeEventListener("mousedown", Sortlistner);
    };
  }, []);

  const deletingItem = items.find((p) => p.id === deleteId);
  const hasActiveFilters =
    filters.query ||
    filters.category ||
    filters.status ||
    filters.isActive !== "all";

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}

      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div>
            <div className="page-header-label">Vendor dashboard</div>
            <h1>
              Your <em>produce</em> listings
            </h1>
            <p className="page-header-sub">
              Manage your products, update availability, and track
              certifications.
            </p>
          </div>
          <button className="btn-add-produce" onClick={openCreate}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add produce
          </button>
        </div>
      </div>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <div className="toolbar">
        {/* Search */}
        <div className="search-input-wrap modern">
          <input
            type="text"
            placeholder="Search produce..."
            value={filters.query}
            onChange={(e) => setFilterField("query", e.target.value)}
          />
        </div>

        {/* Category → modern dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownOpen(categoryRef)}
          >
            {filters.category || "Category"}
            <span>▾</span>
          </button>

          <div className="dropdown-menu close" ref={categoryRef}>
            <div onClick={() => setFilterField("category", "")}>
              All categories
            </div>
            {CATEGORIES.map((c) => (
              <div key={c} onClick={() => setFilterField("category", c)}>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Status → radio pills */}
        <div className="pill-group">
          {["", "APPROVED", "PENDING", "REJECTED"].map((s) => (
            <button
              key={s}
              className={`pill ${filters.status === s ? "active" : ""}`}
              onClick={() => setFilterField("status", s)}
            >
              {s || "All"}
            </button>
          ))}
        </div>

        {/* Active → radio pills */}
        <div className="pill-group">
          {["all", "active", "inactive"].map((s, i) => (
            <button
              key={i}
              className={`pill ${filters.isActive === s ? "active" : ""}`}
              onClick={() => setFilterField("isActive", s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sort → modern dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => handleDropdownOpen(sortRef)}
          >
            Sort: {filters.sort}
            <span>▾</span>
          </button>

          <div className="dropdown-menu close" ref={sortRef}>
            <div onClick={() => setFilterField("sort", "newest")}>Newest</div>
            <div onClick={() => setFilterField("sort", "name-asc")}>A → Z</div>
            <div onClick={() => setFilterField("sort", "name-desc")}>Z → A</div>
            <div onClick={() => setFilterField("sort", "price-asc")}>
              Low → High
            </div>
            <div onClick={() => setFilterField("sort", "price-desc")}>
              High → Low
            </div>
          </div>
        </div>

        <div className="toolbar-spacer" />

        <span className="results-label">
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{items.length}</strong>
        </span>

        {hasActiveFilters && (
          <button className="clear-btn" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <div className="main-content">
        {/* Grid */}
        <div className="produce-grid">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a8a79e"
                  strokeWidth="1.4"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              {items.length === 0 ? (
                <>
                  <h3>No produce yet</h3>
                  <p>
                    Start building your marketplace presence by adding your
                    first listing.
                  </p>
                  <button className="btn-primary" onClick={openCreate}>
                    Add your first listing
                  </button>
                </>
              ) : (
                <>
                  <h3>No results</h3>
                  <p>No produce matches your current filters.</p>
                  <button className="btn-secondary" onClick={clearFilters}>
                    Clear filters
                  </button>
                </>
              )}
            </div>
          ) : (
            filtered.map((produce, i) => (
              <ProduceCard
                key={produce.id}
                produce={produce}
                index={i}
                onEdit={openEdit}
                onDelete={confirmDelete}
                onToggleActive={toggleActive}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <ProduceModal
        mode={modalMode}
        form={form}
        errors={formErrors}
        onSetField={setFormField}
        onSubmit={submitForm}
        onClose={closeModal}
      />

      <DeleteConfirmModal
        produce={deletingItem}
        onConfirm={executeDelete}
        onCancel={cancelDelete}
      />

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      {toast && (
        <>
          {toast.type === "success" ? (
            <div className="toast toast-success">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="1.8"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {toast.message}
            </div>
          ) : (
            <div className="toast toast-error">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="1.8"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              {toast.message}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProducePage;

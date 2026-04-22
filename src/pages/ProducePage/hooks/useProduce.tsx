import { useState, useMemo } from "react";
import {
  type ModalMode,
  type Produce,
  type ProduceFilters,
  type ProduceFormData,
} from "../types";
import { MOCK_PRODUCE } from "../data/produce";

const DEFAULT_FILTERS: ProduceFilters = {
  query: "",
  category: "",
  status: "",
  isActive: "all",
  sort: "newest",
};

const DEFAULT_FORM: ProduceFormData = {
  name: "",
  description: "",
  price: 0,
  category: "Vegetables",
  availableQuantity: 0,
  isActive: true,
};

export function useProduce() {
  const [items, setItems] = useState<Produce[]>(MOCK_PRODUCE);
  const [filters, setFilters] = useState<ProduceFilters>(DEFAULT_FILTERS);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProduceFormData>(DEFAULT_FORM);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ProduceFormData, string>>
  >({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ── Filtering + sorting ────────────────────────────────────────────────────
  const filtered = useMemo<Produce[]>(() => {
    const q = filters.query.toLowerCase();
    let result = items.filter((p) => {
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      )
        return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.status && p.certificationStatus !== filters.status)
        return false;
      if (filters.isActive === "active" && !p.isActive) return false;
      if (filters.isActive === "inactive" && p.isActive) return false;
      return true;
    });

    const sortMap: Record<
      ProduceFilters["sort"],
      (a: Produce, b: Produce) => number
    > = {
      "name-asc": (a, b) => a.name.localeCompare(b.name),
      "name-desc": (a, b) => b.name.localeCompare(a.name),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "qty-asc": (a, b) => a.availableQuantity - b.availableQuantity,
      "qty-desc": (a, b) => b.availableQuantity - a.availableQuantity,
      newest: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    };
    return [...result].sort(sortMap[filters.sort]);
  }, [items, filters]);

  const stats = useMemo(
    () => ({
      total: items.length,
      active: items.filter((p) => p.isActive).length,
      pending: items.filter((p) => p.certificationStatus === "PENDING").length,
      revenue: items.reduce((acc, p) => acc + p.price * p.availableQuantity, 0),
    }),
    [items],
  );

  // ── Filter helpers ─────────────────────────────────────────────────────────
  const setFilterField = <K extends keyof ProduceFilters>(
    key: K,
    value: ProduceFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  // ── Form helpers ───────────────────────────────────────────────────────────
  const setFormField = <K extends keyof ProduceFormData>(
    key: K,
    value: ProduceFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateForm = (): boolean => {
    const errs: Partial<Record<keyof ProduceFormData, string>> = {};
    if (!form.name.trim()) errs.name = "Product name is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (form.price <= 0) errs.price = "Price must be greater than 0.";
    if (form.availableQuantity < 0)
      errs.availableQuantity = "Quantity cannot be negative.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const openCreate = () => {
    setForm(DEFAULT_FORM);
    setFormErrors({});
    setEditingId(null);
    setModalMode("create");
  };

  const openEdit = (id: string) => {
    const item = items.find((p) => p.id === id);
    if (!item) return;
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      availableQuantity: item.availableQuantity,
      isActive: item.isActive,
    });
    setFormErrors({});
    setEditingId(id);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
    setFormErrors({});
  };

  const submitForm = () => {
    if (!validateForm()) return;
    const now = new Date().toISOString();
    if (modalMode === "create") {
      const newItem: Produce = {
        ...form,
        id: Date.now().toString(),
        certificationStatus: "PENDING",
        createdAt: now,
        updatedAt: now,
      };
      setItems((prev) => [newItem, ...prev]);
      showToast("Produce created successfully!", "success");
    } else if (modalMode === "edit" && editingId) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...form, updatedAt: now } : p,
        ),
      );
      showToast("Produce updated successfully!", "success");
    }
    closeModal();
  };

  const confirmDelete = (id: string) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const executeDelete = () => {
    if (!deleteId) return;
    setItems((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    showToast("Produce deleted.", "success");
  };

  const toggleActive = (id: string) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString() }
          : p,
      ),
    );
  };

  // ── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return {
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
  };
}

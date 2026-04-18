import React, { useEffect, useState } from "react";
// import { plantApi } from '../services/api';
import { toast } from "sonner";
import { demoPlants } from "../../public/demoData/data";

const STAGES = ["Seed", "Sprout", "Vegetative", "Flowering", "Harvest"];
const PLANT_EMOJIS: Record<string, string> = {
  tomato: "🍅",
  spinach: "🥬",
  basil: "🌿",
  mint: "🍃",
  pepper: "🌶️",
  lettuce: "🥗",
  carrot: "🥕",
  default: "🌱",
};

function getPlantEmoji(name: string) {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(PLANT_EMOJIS)) {
    if (lower.includes(key)) return val;
  }
  return PLANT_EMOJIS.default;
}

function healthColor(health: number) {
  if (health >= 70) return "var(--sage)";
  if (health >= 40) return "var(--earth-light)";
  return "var(--terracotta)";
}

function PlantDetailModal({ plant, onClose, onUpdate }: any) {
  const [form, setForm] = useState({
    health: plant.health || 80,
    stage: plant.stage || "Vegetative",
    notes: plant.notes || "",
    wateringSchedule: plant.wateringSchedule || "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: any) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Plant updated!");
      onUpdate();
      onClose();
      setLoading(false);
    }, 700);
    // e.preventDefault();
    // setLoading(true);
    // try {
    //   await plantApi.update(plant.id, { ...form, health: Number(form.health) });
    //   showToast('Plant updated!', 'success');
    //   onUpdate();
    //   onClose();
    // } catch (err: any) {
    //   showToast(err.message || 'Update failed', 'error');
    // } finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Update Plant</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: "3.5rem" }}>{getPlantEmoji(plant.name)}</div>
          <h4 style={{ marginTop: 8 }}>{plant.name}</h4>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Planted:{" "}
            {plant.plantedDate
              ? new Date(plant.plantedDate).toLocaleDateString()
              : "—"}
          </p>
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">
              Health Score: <strong>{form.health}%</strong>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={form.health}
              onChange={set("health")}
              style={{ padding: 0, border: "none", boxShadow: "none" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "var(--text-muted)",
              }}
            >
              <span>Critical</span>
              <span>Healthy</span>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Growth Stage</label>
            <select value={form.stage} onChange={set("stage")}>
              {STAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Watering Schedule</label>
            <input
              placeholder="e.g. Every 2 days"
              value={form.wateringSchedule}
              onChange={set("wateringSchedule")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              rows={3}
              placeholder="Growth observations..."
              value={form.notes}
              onChange={set("notes")}
              style={{ resize: "vertical" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Plant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddPlantModal({ onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    name: "",
    species: "",
    plantedDate: "",
    rentalSpaceId: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: any) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Plant added 🌱");
      onSuccess();
      onClose();
      setLoading(false);
    }, 700);
    // e.preventDefault();
    // setLoading(true);
    // try {
    //   await plantApi.create({ ...form, health: 100, stage: "Seed" });
    //   showToast("Plant added to tracker! 🌱", "success");
    //   onSuccess();
    //   onClose();
    // } catch (err: any) {
    //   showToast(err.message || "Failed to add plant", "error");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Plant</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Plant Name</label>
              <input
                required
                placeholder="e.g. Cherry Tomato"
                value={form.name}
                onChange={set("name")}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Species</label>
              <input
                placeholder="e.g. Solanum lycopersicum"
                value={form.species}
                onChange={set("species")}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Date Planted</label>
            <input
              type="date"
              value={form.plantedDate}
              onChange={set("plantedDate")}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              rows={3}
              placeholder="Initial observations..."
              value={form.notes}
              onChange={set("notes")}
              style={{ resize: "vertical" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Plant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PlantTracking() {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);

  const load = async () => {
    setLoading(true);

    setTimeout(() => {
      setPlants(demoPlants);
      setLoading(false);
    }, 500);
    // setLoading(true);
    // try {
    //   const data = await plantApi.list();
    //   setPlants(data?.data || data?.plants || data || []);
    // } catch { showToast('Failed to load plants', 'error'); }
    // finally { setLoading(false); }
  };

  const deletePlant = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from tracker?`)) return;

    setTimeout(() => {
      toast.message(`${name} removed`);
      setPlants((prev) => prev.filter((p) => p.id !== id));
    }, 500);
    // if (!confirm(`Remove ${name} from tracker?`)) return;
    // try {
    //   await plantApi.delete(id);
    //   showToast(`${name} removed`, "info");
    //   load();
    // } catch {
    //   showToast("Delete failed", "error");
    // }
  };

  useEffect(() => {
    load();
  }, []);

  const stageIndex = (stage: string) => STAGES.indexOf(stage);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>Plant Tracker 🌿</h1>
            <p>Monitor growth, health, and harvest times for your plants</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            + Add Plant
          </button>
        </div>
      </div>

      {plants.length > 0 && (
        <div
          className="stats-grid"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 24 }}
        >
          <div className="stat-card green">
            <div className="stat-label">Total Plants</div>
            <div className="stat-value">{plants.length}</div>
          </div>
          <div className="stat-card forest">
            <div className="stat-label">Avg Health</div>
            <div className="stat-value">
              {Math.round(
                plants.reduce((a, p) => a + (p.health || 0), 0) / plants.length,
              )}
              %
            </div>
          </div>
          <div className="stat-card earth">
            <div className="stat-label">Ready to Harvest</div>
            <div className="stat-value">
              {plants.filter((p) => p.stage === "Harvest").length}
            </div>
          </div>
          <div className="stat-card terra">
            <div className="stat-label">Need Attention</div>
            <div className="stat-value">
              {plants.filter((p) => (p.health || 100) < 40).length}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-screen">
          <div className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      ) : plants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌱</div>
          <h3>No plants tracked yet</h3>
          <p>Start tracking your first plant to monitor its growth</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => setShowAdd(true)}
          >
            Add Your First Plant
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {plants.map((plant, i) => {
            const health = plant.health ?? 80;
            const stage = plant.stage || "Vegetative";
            const si = stageIndex(stage);
            return (
              <div className="plant-card" key={plant.id || i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span style={{ fontSize: "2rem" }}>
                      {getPlantEmoji(plant.name)}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>
                        {plant.name}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {plant.species || "Unknown species"}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`badge ${health >= 70 ? "badge-green" : health >= 40 ? "badge-yellow" : "badge-red"}`}
                  >
                    {health >= 70
                      ? "Healthy"
                      : health >= 40
                        ? "Fair"
                        : "Critical"}
                  </span>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginBottom: 5,
                    }}
                  >
                    <span>Health</span>
                    <span
                      style={{ color: healthColor(health), fontWeight: 500 }}
                    >
                      {health}%
                    </span>
                  </div>
                  <div className="plant-health-bar">
                    <div
                      className={`plant-health-fill ${health < 40 ? "danger" : health < 70 ? "warning" : ""}`}
                      style={{
                        width: `${health}%`,
                        background: healthColor(health),
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginBottom: 8,
                    }}
                  >
                    Growth Stage
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {STAGES.map((s, idx) => (
                      <React.Fragment key={s}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <div
                            className={`stage-dot ${idx < si ? "done" : idx === si ? "active" : ""}`}
                          />
                          <span
                            style={{
                              fontSize: 9,
                              color:
                                idx === si ? "var(--forest)" : "var(--stone)",
                              fontWeight: idx === si ? 600 : 400,
                            }}
                          >
                            {s.slice(0, 3)}
                          </span>
                        </div>
                        {idx < STAGES.length - 1 && (
                          <div
                            style={{
                              flex: 1,
                              height: 1,
                              background:
                                idx < si ? "var(--sage)" : "var(--stone-light)",
                              marginBottom: 14,
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {plant.wateringSchedule && (
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      background: "var(--cream)",
                      padding: "6px 10px",
                      borderRadius: "var(--radius-sm)",
                      marginBottom: 12,
                    }}
                  >
                    💧 {plant.wateringSchedule}
                  </div>
                )}
                {plant.notes && (
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-secondary)",
                      marginBottom: 12,
                      fontStyle: "italic",
                    }}
                  >
                    "{plant.notes?.slice(0, 80)}"
                  </div>
                )}
                {plant.plantedDate && (
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginBottom: 12,
                    }}
                  >
                    🗓 Planted{" "}
                    {new Date(plant.plantedDate).toLocaleDateString()}
                  </div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-sage btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setSelected(plant)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePlant(plant.id, plant.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <PlantDetailModal
          plant={selected}
          onClose={() => setSelected(null)}
          onUpdate={load}
        />
      )}
      {showAdd && (
        <AddPlantModal onClose={() => setShowAdd(false)} onSuccess={load} />
      )}
    </div>
  );
}

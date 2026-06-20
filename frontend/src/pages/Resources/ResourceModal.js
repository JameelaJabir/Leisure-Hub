import React from "react";
import { MdClose, MdInventory2, MdWarning } from "react-icons/md";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const Field = ({ label, value, highlight }) => (
  <div>
    <p style={{
      margin: "0 0 3px",
      fontSize: "10px",
      fontWeight: "700",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.9px",
    }}>
      {label}
    </p>
    <p style={{
      margin: 0,
      fontSize: "14px",
      fontWeight: "600",
      color: highlight ? "#dc2626" : "#1e293b",
    }}>
      {value || "—"}
    </p>
  </div>
);

const TYPE_BADGE = {
  Activities: { bg: "#dbeafe", color: "#1d4ed8" },
  Games:      { bg: "#dcfce7", color: "#15803d" },
  Theater:    { bg: "#ede9fe", color: "#7c3aed" },
  Maintenance:{ bg: "#ffedd5", color: "#c2410c" },
};

const ResourceModal = ({ resource, onClose }) => {
  if (!resource) return null;

  const isLowStock = Number(resource.quantity) <= Number(resource.alertQuantity);
  const badge = TYPE_BADGE[resource.type] || { bg: "#f1f5f9", color: "#475569" };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,12,41,0.65)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        width: "580px",
        maxWidth: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 28px 70px rgba(0,0,0,0.28)",
      }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "20px 20px 0 0",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              background: "rgba(255,255,255,0.22)",
              borderRadius: "12px",
              width: "46px",
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <MdInventory2 size={24} color="#fff" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.75)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.2px" }}>
                Resource Details
              </p>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#fff" }}>
                {resource.itemName}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px" }}>

          {/* Type badge + ID row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <span style={{
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
              background: badge.bg,
              color: badge.color,
            }}>
              {resource.type}
            </span>
            <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600" }}>
              {resource.itemId}
            </span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>·</span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
              Order #{resource.numberOrder}
            </span>
          </div>

          {/* Details grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 28px", marginBottom: "20px" }}>
            <Field label="Quantity" value={resource.quantity} highlight={isLowStock} />
            <Field label="Alert Quantity" value={resource.alertQuantity} />
            <Field label="Unit Price (LKR)" value={`Rs. ${Number(resource.unitPrice).toLocaleString()}`} />
            <Field label="Date Purchased" value={formatDate(resource.datePurchased)} />
            <Field label="Supplier" value={resource.supplier} />
            <Field label="Supplier Email" value={resource.supplierEmail} />
          </div>

          {/* Description */}
          <div style={{
            padding: "16px 20px",
            background: "#f8fafc",
            borderRadius: "12px",
            marginBottom: isLowStock ? "14px" : "24px",
          }}>
            <p style={{ margin: "0 0 5px", fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.9px" }}>
              Description
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#334155", lineHeight: "1.65" }}>
              {resource.description || "No description provided."}
            </p>
          </div>

          {/* Low stock alert */}
          {isLowStock && (
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "14px 18px",
              background: "#fef2f2",
              borderRadius: "12px",
              border: "1px solid #fecaca",
              marginBottom: "24px",
            }}>
              <MdWarning size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: "1px" }} />
              <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#dc2626" }}>
                Low stock alert — current quantity ({resource.quantity}) is at or below the alert threshold ({resource.alertQuantity}).
              </p>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "13px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;

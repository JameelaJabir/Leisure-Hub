import { useNavigate } from "react-router-dom";
import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import { MdInventory2, MdArrowBack, MdSave, MdAdd } from "react-icons/md";

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "14px",
  border: "1.5px solid #e2e8f0",
  borderRadius: "10px",
  background: "#f8fafc",
  color: "#1e293b",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.18s, box-shadow 0.18s",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: "700",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.7px",
  marginBottom: "6px",
};

const errorStyle = {
  fontSize: "12px",
  color: "#dc2626",
  marginTop: "4px",
  fontWeight: "500",
};

const Field = ({ label, error, children }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    {children}
    {error && <p style={errorStyle}>{error}</p>}
  </div>
);

const Form = ({ type, resource, setResource, submitting, handleSubmit, handleChange, errors }) => {
  const navigate = useNavigate();
  const isUpdate = type === "Update";

  const focusStyle = (e) => {
    e.target.style.borderColor = "#4facfe";
    e.target.style.boxShadow = "0 0 0 3px rgba(79,172,254,0.15)";
    e.target.style.background = "#fff";
  };
  const blurStyle = (e) => {
    e.target.style.borderColor = "#e2e8f0";
    e.target.style.boxShadow = "none";
    e.target.style.background = "#f8fafc";
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <HeaderAdmin />

      {/* Page Hero */}
      <div style={{
        background: "linear-gradient(180deg, #0f0c29 0%, #1e1b4b 60%, #2d2a5e 100%)",
        padding: "36px 40px 40px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(147,197,253,0.15)",
            color: "#93c5fd",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "10px",
          }}>
            Resource Management
          </span>
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#fff", margin: "0 0 4px" }}>
            {isUpdate ? "Update Resource" : "Add New Resource"}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
            {isUpdate
              ? "Edit the resource details below and save your changes"
              : "Fill in the details below to add a new resource to inventory"}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div style={{ maxWidth: "900px", margin: "28px auto 50px", padding: "0 24px" }}>
        <div style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}>

          {/* Card Header Strip */}
          <div style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}>
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
                {isUpdate ? "Editing Resource" : "New Resource"}
              </p>
              <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "#fff" }}>
                {resource.itemName || "Resource Details"}
              </h2>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} style={{ padding: "32px 28px" }}>

            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <Field label="Number Order" error={errors.numberOrder}>
                <input
                  type="text"
                  name="itemNo"
                  placeholder="e.g. 01"
                  style={inputStyle}
                  value={resource.numberOrder}
                  onChange={(e) => setResource({ ...resource, numberOrder: e.target.value })}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  required
                />
              </Field>
              <Field label="Item ID" error={errors.itemId}>
                <input
                  type="text"
                  name="itemId"
                  placeholder="e.g. T001"
                  style={inputStyle}
                  value={resource.itemId}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
            </div>

            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <Field label="Item Name" error={errors.itemName}>
                <input
                  type="text"
                  name="itemName"
                  placeholder="Enter item name"
                  style={inputStyle}
                  value={resource.itemName}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
              <Field label="Type" error={errors.type}>
                <select
                  name="type"
                  style={inputStyle}
                  value={resource.type}
                  onChange={(e) => setResource({ ...resource, type: e.target.value })}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Theater">Theater</option>
                  <option value="Games">Games</option>
                  <option value="Activities">Activities</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </Field>
            </div>

            {/* Row 3 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <Field label="Quantity" error={errors.quantity}>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  style={inputStyle}
                  value={resource.quantity}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
              <Field label="Alert Quantity" error={errors.alertQuantity}>
                <input
                  type="number"
                  name="alertQuantity"
                  placeholder="0"
                  style={inputStyle}
                  value={resource.alertQuantity}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
              <Field label="Unit Price (LKR)" error={errors.unitPrice}>
                <input
                  type="number"
                  name="unitPrice"
                  step="0.01"
                  placeholder="0.00"
                  style={inputStyle}
                  value={resource.unitPrice}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "20px" }}>
              <Field label="Description" error={errors.description}>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe the resource..."
                  style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
                  value={resource.description}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
            </div>

            {/* Row 4 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <Field label="Supplier" error={errors.supplier}>
                <input
                  type="text"
                  name="supplier"
                  placeholder="Supplier name"
                  style={inputStyle}
                  value={resource.supplier}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
              <Field label="Supplier Email" error={errors.supplierEmail}>
                <input
                  type="text"
                  name="supplierEmail"
                  placeholder="supplier@example.com"
                  style={inputStyle}
                  value={resource.supplierEmail}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
            </div>

            {/* Date Purchased */}
            <div style={{ marginBottom: "32px" }}>
              <Field label="Date Purchased" error={errors.datePurchased}>
                <input
                  type="date"
                  name="datePurchased"
                  style={{ ...inputStyle, width: "calc(50% - 10px)" }}
                  value={resource.datePurchased
                    ? resource.datePurchased.toString().slice(0, 10)
                    : ""}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={(e) => { blurStyle(e); handleChange(e); }}
                  required
                />
              </Field>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #f1f5f9", marginBottom: "24px" }} />

            {/* Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "11px 24px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "10px",
                  background: "#fff",
                  color: "#64748b",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#1e293b"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#64748b"; }}
              >
                <MdArrowBack size={16} /> Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "11px 28px",
                  fontSize: "14px",
                  fontWeight: "700",
                  border: "none",
                  borderRadius: "10px",
                  background: submitting
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "#fff",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                {isUpdate ? <MdSave size={16} /> : <MdAdd size={16} />}
                {submitting
                  ? isUpdate ? "Saving..." : "Adding..."
                  : isUpdate ? "Save Changes" : "Add Resource"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;

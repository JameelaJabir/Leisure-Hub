import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdEdit, MdDelete, MdPrint, MdTableChart, MdWarning } from "react-icons/md";
import ResourceModal from "./ResourceModal";

const DeleteConfirmModal = ({ resource, onConfirm, onCancel }) => {
  if (!resource) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15,12,41,0.65)",
        backdropFilter: "blur(5px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1100, padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div style={{
        background: "#fff", borderRadius: "20px",
        width: "420px", maxWidth: "100%",
        boxShadow: "0 28px 70px rgba(0,0,0,0.28)",
        overflow: "hidden",
      }}>
        {/* Red header */}
        <div style={{
          background: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
          padding: "24px 28px",
          display: "flex", alignItems: "center", gap: "14px",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.22)", borderRadius: "12px",
            width: "46px", height: "46px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <MdWarning size={26} color="#fff" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.75)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.2px" }}>
              Confirm Deletion
            </p>
            <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "#fff" }}>
              Delete Resource
            </h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px" }}>
          <p style={{ margin: "0 0 6px", fontSize: "15px", color: "#1e293b", fontWeight: "600" }}>
            Are you sure you want to delete this resource?
          </p>
          <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#64748b" }}>
            This action cannot be undone.
          </p>

          {/* Resource info card */}
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: "12px", padding: "14px 18px", marginBottom: "24px",
          }}>
            <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Resource to be deleted
            </p>
            <p style={{ margin: "0 0 2px", fontSize: "15px", fontWeight: "700", color: "#dc2626" }}>
              {resource.itemName}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#ef4444" }}>
              {resource.itemId} · {resource.type}
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1, padding: "12px",
                fontSize: "14px", fontWeight: "600",
                border: "1.5px solid #e2e8f0", borderRadius: "10px",
                background: "#fff", color: "#64748b", cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1, padding: "12px",
                fontSize: "14px", fontWeight: "700",
                border: "none", borderRadius: "10px",
                background: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
                color: "#fff", cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TYPE_BADGE = {
  Activities: { bg: "#dbeafe", color: "#1d4ed8" },
  Games:      { bg: "#dcfce7", color: "#15803d" },
  Theater:    { bg: "#ede9fe", color: "#7c3aed" },
  Maintenance:{ bg: "#ffedd5", color: "#c2410c" },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
};

const ResourceTable = ({ filter, searchTerm }) => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [reportMode, setReportMode] = useState(false);
  const navigate = useNavigate();

  const handleView = (resource) => {
    setSelectedResource(resource);
    setModalVisible(true);
  };

  const getAllResources = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/resources/getResource");
      if (response.data.success) {
        let filtered = response.data.resources;
        if (filter !== "All") filtered = filtered.filter((r) => r.type === filter);
        if (searchTerm) filtered = filtered.filter((r) =>
          r.itemId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResources(filtered);
      }
    } catch (error) {
      toast.error("Error fetching resources");
    }
  };

  useEffect(() => { getAllResources(); }, [filter, searchTerm]); // eslint-disable-line

  const deleteResource = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/resources/deleteResource/${id}`);
      if (response.data.success) {
        toast.success("Resource deleted successfully");
        getAllResources();
      }
    } catch (error) {
      toast.error("Error deleting resource");
    } finally {
      setDeleteTarget(null);
    }
  };

  const TH = ({ children, center }) => (
    <th style={{
      padding: "13px 16px",
      textAlign: center ? "center" : "left",
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      color: "#64748b",
      background: "#f8fafc",
      borderBottom: "2px solid #e2e8f0",
      whiteSpace: "nowrap",
    }}>
      {children}
    </th>
  );

  const TD = ({ children, center, style: extra }) => (
    <td style={{
      padding: "14px 16px",
      fontSize: "13px",
      color: "#334155",
      borderBottom: "1px solid #f1f5f9",
      verticalAlign: "middle",
      textAlign: center ? "center" : "left",
      ...extra,
    }}>
      {children}
    </td>
  );

  return (
    <div>
      {/* Table Card */}
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}>
        {resources.length === 0 ? (
          <div style={{ padding: "70px 40px", textAlign: "center", color: "#94a3b8" }}>
            <MdTableChart size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
            <p style={{ fontSize: "15px", fontWeight: "600", margin: 0 }}>No resources found</p>
            <p style={{ fontSize: "13px", margin: "6px 0 0" }}>Try adjusting the filter or search term.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <TH>#</TH>
                  <TH>Item ID</TH>
                  <TH>Item Name</TH>
                  <TH>Type</TH>
                  <TH center>Qty</TH>
                  <TH>Unit Price (LKR)</TH>
                  <TH>Description</TH>
                  <TH center>Alert Qty</TH>
                  <TH>Supplier</TH>
                  <TH>Supplier Email</TH>
                  <TH>Date Purchased</TH>
                  {!reportMode && <TH center>Actions</TH>}
                </tr>
              </thead>
              <tbody>
                {resources.map((r) => {
                  const isLowStock = Number(r.quantity) <= Number(r.alertQuantity);
                  const badge = TYPE_BADGE[r.type] || { bg: "#f1f5f9", color: "#475569" };
                  return (
                    <tr
                      key={r._id}
                      style={{ transition: "background 0.12s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <TD style={{ color: "#94a3b8", fontWeight: "600" }}>{r.numberOrder}</TD>
                      <TD style={{ fontWeight: "700", color: "#1e293b" }}>{r.itemId}</TD>
                      <TD style={{ fontWeight: "600" }}>{r.itemName}</TD>
                      <TD>
                        <span style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "700",
                          background: badge.bg,
                          color: badge.color,
                          whiteSpace: "nowrap",
                        }}>
                          {r.type}
                        </span>
                      </TD>
                      <TD center>
                        <span style={{
                          display: "inline-block",
                          fontWeight: "700",
                          color: isLowStock ? "#dc2626" : "#1e293b",
                          background: isLowStock ? "#fef2f2" : "#f1f5f9",
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "13px",
                        }}>
                          {r.quantity}
                        </span>
                      </TD>
                      <TD style={{ fontWeight: "600" }}>
                        {Number(r.unitPrice).toLocaleString()}
                      </TD>
                      <TD style={{ color: "#64748b", maxWidth: "200px" }}>
                        <span style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {r.description}
                        </span>
                      </TD>
                      <TD center style={{ color: "#64748b" }}>{r.alertQuantity}</TD>
                      <TD>{r.supplier}</TD>
                      <TD style={{ color: "#64748b" }}>{r.supplierEmail}</TD>
                      <TD style={{ whiteSpace: "nowrap" }}>{formatDate(r.datePurchased)}</TD>

                      {!reportMode && (
                        <TD center>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                            <button
                              onClick={() => handleView(r)}
                              title="View Details"
                              style={{
                                background: "#eff6ff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "7px 10px",
                                cursor: "pointer",
                                color: "#3b82f6",
                                display: "flex",
                                alignItems: "center",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "#dbeafe"}
                              onMouseLeave={e => e.currentTarget.style.background = "#eff6ff"}
                            >
                              <MdVisibility size={16} />
                            </button>
                            <button
                              onClick={() => navigate(`/updateResource/${r._id}`)}
                              title="Edit"
                              style={{
                                background: "#f0fdf4",
                                border: "none",
                                borderRadius: "8px",
                                padding: "7px 10px",
                                cursor: "pointer",
                                color: "#16a34a",
                                display: "flex",
                                alignItems: "center",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "#dcfce7"}
                              onMouseLeave={e => e.currentTarget.style.background = "#f0fdf4"}
                            >
                              <MdEdit size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(r)}
                              title="Delete"
                              style={{
                                background: "#fef2f2",
                                border: "none",
                                borderRadius: "8px",
                                padding: "7px 10px",
                                cursor: "pointer",
                                color: "#dc2626",
                                display: "flex",
                                alignItems: "center",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
                              onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}
                            >
                              <MdDelete size={16} />
                            </button>
                          </div>
                        </TD>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
        {reportMode && (
          <button
            onClick={() => window.print()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, #0f0c29 0%, #302b63 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <MdPrint size={17} /> Print Report
          </button>
        )}
        <button
          onClick={() => setReportMode(!reportMode)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: reportMode
              ? "#f1f5f9"
              : "linear-gradient(135deg, #4c5f08 0%, #3d7a27 100%)",
            color: reportMode ? "#475569" : "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <MdTableChart size={17} />
          {reportMode ? "Exit Report Mode" : "Generate Report"}
        </button>
      </div>

      {modalVisible && selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={() => setModalVisible(false)}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          resource={deleteTarget}
          onConfirm={() => deleteResource(deleteTarget._id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default ResourceTable;

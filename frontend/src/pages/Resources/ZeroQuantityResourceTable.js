import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import { MdWarning, MdArrowBack, MdMail, MdInventory2, MdCheckCircle } from "react-icons/md";

const TYPE_BADGE = {
  Activities: { bg: "#dbeafe", color: "#1d4ed8" },
  Games:      { bg: "#dcfce7", color: "#15803d" },
  Theater:    { bg: "#ede9fe", color: "#7c3aed" },
  Maintenance:{ bg: "#ffedd5", color: "#c2410c" },
};

const ZeroQuantityResourceTable = () => {
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredResources = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/resources/getResource");
        if (response.data.success) {
          const low = response.data.resources.filter(
            (r) => Number(r.quantity) === 0
          );
          setFilteredResources(low);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredResources();
  }, []);

  const handleContact = (email, itemName) => {
    window.location.href = `mailto:${email}?subject=Stock%20Replenishment%20Request%20-%20${encodeURIComponent(itemName)}&body=Dear%20Supplier%2C%0A%0AWe%20would%20like%20to%20request%20a%20restock%20for%3A%20${encodeURIComponent(itemName)}.%0A%0APlease%20get%20in%20touch%20at%20your%20earliest%20convenience.%0A%0ARegards%2C%0ALeisure%20Hub%20Management`;
  };

  const TH = ({ children }) => (
    <th style={{
      padding: "13px 16px",
      textAlign: "left",
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

  const TD = ({ children, style: extra }) => (
    <td style={{
      padding: "14px 16px",
      fontSize: "13px",
      color: "#334155",
      borderBottom: "1px solid #f1f5f9",
      verticalAlign: "middle",
      ...extra,
    }}>
      {children}
    </td>
  );

  return (
    <LayoutAdmin title="Low Stock Resources — LeisureHub">
      <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>

        {/* Page Hero */}
        <div style={{
          background: "linear-gradient(180deg, #0f0c29 0%, #1e1b4b 60%, #2d2a5e 100%)",
          padding: "40px 40px 40px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(254,202,202,0.2)",
              color: "#fca5a5",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: "20px",
              marginBottom: "12px",
            }}>
              Resource Management
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", margin: "0 0 6px", letterSpacing: "-0.4px" }}>
              Low Stock Items
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
              Resources with zero quantity that need immediate restocking
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 32px 50px" }}>

          {/* Alert Banner */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: "14px",
            padding: "18px 22px",
            marginBottom: "22px",
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
              borderRadius: "10px",
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <MdWarning size={22} color="#fff" />
            </div>
            <div>
              <p style={{ margin: "0 0 3px", fontSize: "14px", fontWeight: "700", color: "#9a3412" }}>
                Immediate Action Required
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#c2410c", lineHeight: "1.5" }}>
                The following resources have reached zero quantity. Contact the suppliers
                directly using the <strong>Contact Supplier</strong> button to arrange restocking.
              </p>
            </div>
          </div>

          {/* Top bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#fef2f2",
                color: "#dc2626",
                fontSize: "13px",
                fontWeight: "700",
                padding: "5px 14px",
                borderRadius: "20px",
                border: "1px solid #fecaca",
              }}>
                <MdWarning size={15} />
                {filteredResources.length} item{filteredResources.length !== 1 ? "s" : ""} out of stock
              </span>
            </div>
            <Link to="/resource" style={{ textDecoration: "none" }}>
              <button style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 18px",
                fontSize: "13px",
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
                <MdArrowBack size={16} /> Back to Resources
              </button>
            </Link>
          </div>

          {/* Table Card */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}>
            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "#94a3b8" }}>
                <p style={{ fontSize: "14px", fontWeight: "600" }}>Loading resources...</p>
              </div>
            ) : filteredResources.length === 0 ? (
              <div style={{ padding: "70px 40px", textAlign: "center" }}>
                <div style={{
                  background: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
                  borderRadius: "50%",
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <MdCheckCircle size={34} color="#fff" />
                </div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: "0 0 6px" }}>
                  All resources are well stocked!
                </p>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  No items currently have zero quantity.
                </p>
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
                      <TH>Supplier</TH>
                      <TH>Supplier Email</TH>
                      <TH>Action</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((r) => {
                      const badge = TYPE_BADGE[r.type] || { bg: "#f1f5f9", color: "#475569" };
                      return (
                        <tr
                          key={r._id}
                          style={{ transition: "background 0.12s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#fef9f9"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <TD style={{ color: "#94a3b8", fontWeight: "600" }}>
                            {r.numberOrder}
                          </TD>
                          <TD style={{ fontWeight: "700", color: "#1e293b" }}>
                            {r.itemId}
                          </TD>
                          <TD>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{
                                background: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
                                borderRadius: "8px",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}>
                                <MdInventory2 size={16} color="#fff" />
                              </div>
                              <span style={{ fontWeight: "600", color: "#1e293b" }}>
                                {r.itemName}
                              </span>
                            </div>
                          </TD>
                          <TD>
                            <span style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: "700",
                              background: badge.bg,
                              color: badge.color,
                            }}>
                              {r.type}
                            </span>
                          </TD>
                          <TD style={{ fontWeight: "600" }}>{r.supplier}</TD>
                          <TD>
                            <a
                              href={`mailto:${r.supplierEmail}`}
                              style={{
                                color: "#3b82f6",
                                textDecoration: "none",
                                fontSize: "13px",
                                fontWeight: "500",
                              }}
                              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                            >
                              {r.supplierEmail}
                            </a>
                          </TD>
                          <TD>
                            <button
                              onClick={() => handleContact(r.supplierEmail, r.itemName)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                padding: "7px 14px",
                                fontSize: "12px",
                                fontWeight: "700",
                                border: "none",
                                borderRadius: "8px",
                                background: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
                                color: "#fff",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "opacity 0.15s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                            >
                              <MdMail size={14} /> Contact Supplier
                            </button>
                          </TD>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer note */}
          {filteredResources.length > 0 && (
            <p style={{ marginTop: "14px", fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
              Clicking <strong>Contact Supplier</strong> opens a pre-filled email to the supplier requesting restocking.
            </p>
          )}

        </div>
      </div>
    </LayoutAdmin>
  );
};

export default ZeroQuantityResourceTable;

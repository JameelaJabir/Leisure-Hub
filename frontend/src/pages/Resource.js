import React, { useState, useEffect } from "react";
import LayoutAdmin from "../components/Layout/LayoutAdmin";
import ResourceTable from "./Resources/ResourceTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdInventory2, MdPayments, MdWarning, MdAdd, MdSearch } from "react-icons/md";

const Resource = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);
  const [zeroQuantityCount, setZeroQuantityCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/resources/getResource");
        const { countTotal, totalAmountSpent, zeroQuantityCount } = response.data;
        setTotalCount(countTotal);
        setTotalAmountSpent(totalAmountSpent);
        setZeroQuantityCount(zeroQuantityCount);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Resources",
      value: totalCount,
      icon: MdInventory2,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      shadow: "rgba(79,172,254,0.35)",
      link: null,
    },
    {
      label: "Total Amount Spent",
      value: `Rs. ${Number(totalAmountSpent).toLocaleString()}`,
      icon: MdPayments,
      gradient: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
      shadow: "rgba(11,163,96,0.35)",
      link: null,
    },
    {
      label: "Low Stock Items",
      value: zeroQuantityCount,
      icon: MdWarning,
      gradient: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
      shadow: "rgba(247,112,98,0.35)",
      link: "/zeroQuantityResources",
    },
  ];

  return (
    <LayoutAdmin title="Admin Resources — LeisureHub">
      <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>

        {/* Page Header */}
        <div style={{
          background: "linear-gradient(180deg, #0f0c29 0%, #1e1b4b 60%, #2d2a5e 100%)",
          padding: "40px 40px 40px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-70px", right: "-70px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", bottom: "-80px", left: "30%", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative" }}>
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
              marginBottom: "12px",
            }}>
              Resource Management
            </span>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", margin: "0 0 6px", letterSpacing: "-0.4px" }}>
              Resources
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
              Track inventory, suppliers and resource availability
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "24px 32px 50px" }}>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "22px" }}>
            {statCards.map((card) => {
              const Icon = card.icon;
              const cardInner = (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: card.link ? "pointer" : "default",
                  }}
                  onMouseEnter={e => {
                    if (card.link) {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = `0 14px 36px ${card.shadow}`;
                    }
                  }}
                  onMouseLeave={e => {
                    if (card.link) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                    }
                  }}
                >
                  <div style={{
                    background: card.gradient,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                    <div style={{
                      background: "rgba(255,255,255,0.22)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Icon size={26} color="#fff" />
                    </div>
                    <span style={{ fontSize: "30px", fontWeight: "800", color: "#fff" }}>
                      {card.value}
                    </span>
                  </div>
                  <div style={{ padding: "14px 24px 16px" }}>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                      {card.label}
                    </p>
                    {card.link && (
                      <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#f5576c", fontWeight: "600" }}>
                        View all →
                      </p>
                    )}
                  </div>
                </div>
              );

              return card.link
                ? <Link key={card.label} to={card.link} style={{ textDecoration: "none" }}>{cardInner}</Link>
                : <div key={card.label}>{cardInner}</div>;
            })}
          </div>

          {/* Controls Bar */}
          <div style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "16px 24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}>
            <Link to="/addResource" style={{ textDecoration: "none" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <MdAdd size={18} /> Add Resource
              </button>
            </Link>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              {/* Filter */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#64748b", whiteSpace: "nowrap" }}>
                  Filter by Type
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    padding: "8px 14px",
                    fontSize: "13px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "8px",
                    background: "#f8fafc",
                    color: "#1e293b",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="All">All Types</option>
                  <option value="Activities">Activities</option>
                  <option value="Games">Games</option>
                  <option value="Theater">Theater</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* Search */}
              <div style={{ position: "relative" }}>
                <MdSearch
                  size={18}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search by Item ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "8px 14px 8px 34px",
                    fontSize: "13px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "8px",
                    background: "#f8fafc",
                    color: "#1e293b",
                    width: "220px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <ResourceTable filter={filter} searchTerm={searchTerm} />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Resource;

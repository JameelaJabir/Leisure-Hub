import React from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from './../components/Layout/LayoutAdmin';
import { useAuth } from '../context/auth';
import {
  MdMovie, MdSportsSoccer, MdPeople, MdInventory2,
  MdBuild, MdBadge, MdPayment, MdSupportAgent
} from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';

const modules = [
  {
    name: "Movies",
    description: "Manage movies & showtime scheduling",
    icon: MdMovie,
    link: "/adminmoviedashboard",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    shadow: "rgba(102, 126, 234, 0.35)",
    accent: "#667eea",
  },
  {
    name: "Games & Activities",
    description: "Manage games, activities & bookings",
    icon: MdSportsSoccer,
    link: "/adminactivitydashboard/activitymanagement",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    shadow: "rgba(17, 153, 142, 0.35)",
    accent: "#11998e",
  },
  {
    name: "Members",
    description: "Manage club members & accounts",
    icon: MdPeople,
    link: "/admin/users",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    shadow: "rgba(245, 87, 108, 0.35)",
    accent: "#f5576c",
  },
  {
    name: "Resources",
    description: "Manage resources & inventory",
    icon: MdInventory2,
    link: "/resource",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    shadow: "rgba(79, 172, 254, 0.35)",
    accent: "#4facfe",
  },
  {
    name: "Maintenance",
    description: "Manage maintenance tasks & scheduling",
    icon: MdBuild,
    link: "#",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    shadow: "rgba(250, 112, 154, 0.35)",
    accent: "#fa709a",
  },
  {
    name: "Employees",
    description: "Manage staff, leaves & payroll",
    icon: MdBadge,
    link: "/employeelist",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    shadow: "rgba(161, 140, 209, 0.35)",
    accent: "#a18cd1",
  },
  {
    name: "Payments",
    description: "Manage payments & transactions",
    icon: MdPayment,
    link: "/all",
    gradient: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
    shadow: "rgba(11, 163, 96, 0.35)",
    accent: "#0ba360",
  },
  {
    name: "Customer Services",
    description: "Manage inquiries & customer support",
    icon: MdSupportAgent,
    link: "/contactdetails",
    gradient: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
    shadow: "rgba(247, 112, 98, 0.35)",
    accent: "#f77062",
  },
];

const DashboardAdmin = () => {
  const [auth] = useAuth();
  const adminName = auth?.user
    ? `${auth.user.fname} ${auth.user.lname}`
    : 'Admin';

  return (
    <LayoutAdmin>
      <div style={{ background: '#f0f2f5', minHeight: '100vh' }}>

        {/* ── Hero Banner ── */}
        <div style={{
          background: 'linear-gradient(180deg, #0f0c29 0%, #1e1b4b 60%, #2d2a5e 100%)',
          padding: '40px 40px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-100px', left: '35%',
            width: '240px', height: '240px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }} />
          <div style={{
            position: 'absolute', top: '20px', left: '20%',
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.025)',
          }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(147,197,253,0.15)',
              color: '#93c5fd',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '20px',
              marginBottom: '14px',
            }}>
              Admin Control Panel
            </span>
            <h1 style={{
              fontSize: '34px',
              fontWeight: '800',
              margin: '0 0 8px',
              color: '#fff',
              letterSpacing: '-0.5px',
            }}>
              Welcome back, {adminName} 👋
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>
              Leisure Hub — manage all aspects of your facility from here.
            </p>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 30px 50px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))',
            gap: '22px',
          }}>
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link key={mod.name} to={mod.link} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                      transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-7px)';
                      e.currentTarget.style.boxShadow = `0 16px 40px ${mod.shadow}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
                    }}
                  >
                    {/* Gradient top strip */}
                    <div style={{
                      background: mod.gradient,
                      padding: '26px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.22)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '14px',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={30} color="#fff" />
                      </div>
                      <div style={{
                        background: 'rgba(255,255,255,0.18)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <FiArrowRight size={16} color="#fff" />
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '20px 24px 24px' }}>
                      <h3 style={{
                        margin: '0 0 6px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1e293b',
                      }}>
                        {mod.name}
                      </h3>
                      <p style={{
                        margin: '0 0 16px',
                        fontSize: '13px',
                        color: '#64748b',
                        lineHeight: '1.55',
                      }}>
                        {mod.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: mod.accent,
                        fontSize: '13px',
                        fontWeight: '600',
                      }}>
                        Open module <FiArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </LayoutAdmin>
  );
};

export default DashboardAdmin;

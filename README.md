# Leisure Hub — Leisure Management System

A full-stack web platform built for **New Rekha Cinema Theatre** that serves as a one-stop destination for movie scheduling, ticket booking, leisure activity management, and complete back-office operations.

---

## System Overview

The platform connects a React frontend to a Node.js/Express REST API backed by MongoDB, covering six core operational domains:

| Module | Description |
|---|---|
| User Management | Registration, login, profile management, membership tiers |
| Movie Management | Movie catalog, categories, schedule management |
| Ticket Booking | Seat selection and booking for scheduled screenings |
| Payment Management | OTP-verified card payments, payment summaries |
| Games & Activities | Activity catalog, customer activity requests |
| Staff Management | Employee records, leave requests, salary tracking |
| Resource & Maintenance | Inventory tracking, supplier management, low-stock alerts |
| Interaction Management | Contact us, customer feedback, ratings |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Ant Design (antd) | Component library |
| Tailwind CSS | Utility-first styling |
| React Router DOM v6 | Client-side routing |
| Recoil | Global state management |
| Formik + Yup | Form handling and validation |
| Axios | HTTP client |
| jsPDF + jspdf-autotable | PDF report generation |
| React CSV | CSV data export |
| RSuite | Additional UI components |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Token (JWT) | Stateless authentication |
| Bcrypt | Password hashing |
| Speakeasy | TOTP-based OTP generation |
| Nodemailer | Email delivery (OTP, notifications) |
| Multer | File/image uploads |
| Morgan | HTTP request logging |

---

## Security Features

- **JWT Authentication** — Token-based auth with configurable expiry; all protected routes verified via `requireSignIn` middleware
- **Role-Based Access Control (RBAC)** — Numeric role system (`0` = customer, `1` = admin) enforced at the middleware layer via `isAdmin`; admin routes are fully gated
- **Password Encryption** — bcrypt hashing with 10 salt rounds; passwords are never stored or returned in plaintext
- **OTP-Verified Payments** — Speakeasy TOTP generates a time-based one-time password delivered via email; card payments require OTP verification before being committed
- **Secret Question Recovery** — Security-question-based password reset flow as an alternative to email recovery
- **Environment Variables** — Sensitive config (JWT secret, DB URI, mail credentials) isolated in `.env` and excluded from version control

---

## Features at a Glance

**Customer-facing**
- Browse movies, view schedules, and book tickets
- Request leisure activities and games
- Manage membership and personal profile
- OTP-secured online payment flow
- Submit feedback, ratings, and contact inquiries

**Admin / Staff**
- Full CRUD for movies, schedules, categories, and activities
- Employee management — records, leave requests, salary tracking
- Resource & inventory management with supplier details, unit pricing, and configurable low-stock alert thresholds
- Payment and booking summaries
- Export data as PDF reports or CSV files

---

## Project Structure

```
Leisure-Hub/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handler logic
│   ├── helpers/         # Utility functions (auth helpers)
│   ├── middlewares/     # JWT & role-based auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   └── server.js        # Entry point
└── frontend/
    └── src/
        ├── components/  # Reusable UI components
        ├── context/     # React Context providers
        ├── dto/         # Data transfer object definitions
        ├── pages/       # Route-level page components
        ├── recoil/      # Recoil atoms and selectors
        └── App.js       # Route configuration
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/JameelaJabir/Leisure-Hub.git
cd Leisure-Hub
```

**Backend**
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run server
```

**Frontend**
```bash
cd frontend
npm install
npm start
```

The frontend proxies API requests to `http://localhost:8080`.

### Run both concurrently (from backend/)
```bash
npm run dev
```

---

## API Overview

All API routes are prefixed and protected where applicable:

| Route Group | Auth Required | Admin Only |
|---|---|---|
| `/api/v1/auth` | Partial | Partial |
| `/api/v1/movie` | No | Write ops |
| `/api/v1/booking` | Yes | No |
| `/api/v1/payment` | Yes | No |
| `/api/v1/employee` | Yes | Yes |
| `/api/v1/resource` | Yes | Yes |
| `/api/v1/games` | Partial | Partial |

---

## Contributors

This project was developed as a group academic project.

---

## License

MIT

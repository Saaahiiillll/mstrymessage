# 💬 Anonymous Feedback Platform

A full-stack web app where users get a **public link** and receive **anonymous messages and honest feedback**, with secure sign-up, email OTP verification, and AI-generated message suggestions.

<!-- Add a screenshot or GIF of the dashboard here -->
<!-- ![Dashboard Preview](./public/screenshots/dashboard.png) -->

---

## ✨ Features

- 🔐 **Authentication**: Secure sign-up / sign-in with NextAuth.js (credentials provider, JWT sessions)
- 📧 **Email OTP Verification**: 6-digit code sent via Resend; accounts activate only after verification
- ✅ **Real-time Username Check**: Debounced availability check while typing (no spam requests to the DB)
- 🛡️ **Schema Validation**: Zod schemas for sign-up, sign-in, OTP, and message forms (client + server)
- 📨 **Anonymous Messaging**: Anyone can send a message via `/u/username` without logging in
- 🎛️ **Accept / Pause Messages**: Toggle whether your profile accepts new messages
- 📊 **User Dashboard**: View, refresh, and delete received messages
- 🤖 **AI Message Suggestions**: One-click suggested messages to break the ice
- 📱 **Responsive UI**: Built with Tailwind CSS and shadcn/ui (including a carousel)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router), React |
| Language | TypeScript |
| Styling / UI | Tailwind CSS, shadcn/ui |
| Forms & Validation | React Hook Form, Zod |
| Auth | NextAuth.js (Auth.js) |
| Database | MongoDB + Mongoose (aggregation pipeline) |
| Email | Resend + React Email |



---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # sign-in, sign-up, verify pages
│   ├── (app)/           # dashboard and navbar layout
│   ├── u/[username]/    # public message page
│   └── api/             # route handlers (backend)
├── components/          # UI components (MessageCard, Navbar, ui/)
├── model/               # Mongoose models (User, Message)
├── schemas/             # Zod validation schemas
├── lib/                 # dbConnect, resend, utils
├── helpers/             # sendVerificationEmail
└── types/               # shared TypeScript types
```

---

## 🔌 API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/sign-up` | Register user and send OTP email |
| POST | `/api/verify-code` | Verify OTP and activate account |
| GET | `/api/check-username-unique` | Check username availability |
| POST / GET | `/api/accept-messages` | Update / read message acceptance status |
| GET | `/api/get-messages` | Fetch user's messages (MongoDB aggregation) |
| POST | `/api/send-message` | Send an anonymous message |
| DELETE | `/api/delete-message/[messageid]` | Delete a message |
| POST | `/api/suggest-messages` | Generate AI message suggestions |

---

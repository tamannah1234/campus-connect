# 🎓 Campus Connect

Campus Connect is a full-stack web application designed for seamless campus communication.  
It enables authenticated users to discover other users, view profiles, and interact in a clean, modern interface.

This project demonstrates **real-world full-stack development** using modern tools and best practices.

---

## 🔗 Live Project
> _(Add deployment link here if hosted)_  
Example: https://campus-connect.vercel.app

---

## 🚀 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React.js**
- **Tailwind CSS**
- **TypeScript**

### Backend
- **Convex** (Real-time backend & database)

### Authentication
- **Clerk** (Secure sign-up & sign-in)

---

## ✨ Features

- 🔐 Secure authentication using Clerk
- 👥 User discovery & sidebar listing
- 🔍 Search users by name
- 🖼 Profile image support with fallback initials
- 📱 Responsive UI using Tailwind CSS
- ⚡ Real-time data fetching with Convex
- 🎨 Clean and modern UI (no component libraries used)

---

## 📸 Screenshots
> _(Optional – you can add screenshots here later)_


/public/screenshots/
├── dashboard.png
├── users-sidebar.png


---

## 📁 Project Structure


campus-connect/
├── src/
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── globals.css
│ │ ├── dashboard/
│ │ └── sign-up/
│ ├── components/
│ │ └── UsersSidebar.tsx
│ └── providers/
│ └── Providers.tsx
├── convex/
│ ├── users.ts
│ └── _generated/
├── public/
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md


---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
🛠 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/campus-connect.git
cd campus-connect
2️⃣ Install Dependencies
npm install
3️⃣ Start Convex
npx convex dev
4️⃣ Run the Application
npm run dev

Open your browser at:
👉 http://localhost:3000

🎨 Styling Approach

Tailwind CSS used for utility-first styling

No UI libraries (manual layout & responsiveness)

Consistent spacing, typography, and color system

🧠 What I Learned

Integrating Convex with Next.js App Router

Managing authentication using Clerk

Handling real-time data with React hooks

Debugging Tailwind & PostCSS configuration issues

Building scalable and reusable UI components

🧩 Challenges Solved

Fixed Tailwind CSS not applying due to PostCSS config issues

Managed Convex provider setup in App Router

Implemented avatar fallback logic when images are missing

Ensured responsive and consistent layout across components

👩‍💻 Author

Tamanna Singh
Java Full Stack Developer
Skills: Java, Spring Boot, React, Next.js, Tailwind CSS, MySQL
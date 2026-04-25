# 🚀 Prathamsinh Rajput - Professional Portfolio 2026

A high-performance, aesthetically stunning, and fully responsive MERN stack portfolio. Built with a focus on premium design, smooth animations, and professional functionality.

![Portfolio Preview Showcase](https://img.shields.io/badge/Design-Premium-cyan)
![Stack-MERN-blue](https://img.shields.io/badge/Stack-MERN-red)
![Frontend-React-61dafb](https://img.shields.io/badge/Frontend-React_19-61dafb)
![Animations-Framer_Motion-black](https://img.shields.io/badge/Animations-Framer_Motion-black)

---

## ✨ Key Features

- **Premium Design System**: Brutalist-inspired aesthetic with high-contrast typography and a vibrant color palette.
- **Smooth Interaction**: Integrated **Lenis** for buttery-smooth inertial scrolling and **Framer Motion** for staggered layout animations.
- **Dynamic Projects**: Projects are fetched dynamically from a **MongoDB** backend, ensuring easy updates without redeploying the frontend.
- **Interactive Bento Grid**: An advanced "Expertise & History" section using a responsive bento grid layout with hover effects.
- **Secure Contact System**: 
    - Real-time form validation.
    - **Nodemailer** integration for instant email notifications.
    - **Rate limiting** and **Honeypot protection** to prevent spam.
- **Responsive & Adaptive**: Pixel-perfect layout across all devices with custom mobile navigation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Scrolling**: [Lenis React](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: Express-rate-limit, CORS, Dotenv
- **Services**: Nodemailer (Gmail SMTP)

---

## 📂 Project Structure

```text
Portfolio-2026-MERN/
├── client_app/          # Primary React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── sections/    # Main page sections (Hero, About, Projects, etc.)
│   │   ├── pages/       # Page views
│   │   └── assets/      # Static assets (images, icons)
│   └── tailwind.config.js
├── server/              # Node.js Express Backend
│   ├── models/          # MongoDB Schemas (Project, Contact)
│   ├── routes/          # API Endpoints
│   ├── index.js         # Entry point
│   └── seed.js          # Script to populate initial project data
└── .env                 # Environment configurations
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/PrathamsinhParmar/Portfolio-2026.git
cd Portfolio-2026
```

### 2. Setup Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient_email@gmail.com
FRONTEND_URL=http://localhost:5173
```

### 3. Setup Frontend
```bash
cd ../client_app
npm install
```

### 4. Run the Application
You can use the provided batch script in the root directory:
```bash
../run_portfolio.bat
```
Or run them separately:
- **Backend**: `cd server && node index.js`
- **Frontend**: `cd client_app && npm run dev`

---

## 🎨 Design Aesthetic

The portfolio follows a **Premium Brutalist** design:
- **Color Palette**: Pitch black background (`#000000`), toxic lime accents (`#ccff00`), and clean white typography.
- **Typography**: Modern, bold headlines with high readability.
- **Micro-interactions**: Magnetic buttons, cursor mask effects, and elegant hover transitions.

---

## 👨‍💻 Author

**Prathamsinh Rajput**
- GitHub: [@PrathamsinhParmar](https://github.com/PrathamsinhParmar)
- Portfolio: [Prathamsinh Rajput](https://prathamrajput.vercel.app/)

---
*Built with ❤️ by Prathamsinh Rajput*

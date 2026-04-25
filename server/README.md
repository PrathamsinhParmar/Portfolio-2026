# ⚙️ Portfolio 2026 - Backend (Server)

This is the Node.js/Express backend that powers the Prathamsinh Rajput Portfolio. It handles project data and contact form submissions.

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Configuration
Create a `.env` file in this directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=recipient_email
FRONTEND_URL=http://localhost:5173
```

### Running the Server
```bash
node index.js
```

---

## 🛠️ API Reference

### Projects
- `GET /api/projects`: Retrieve list of all projects ordered by creation date.

### Contact
- `POST /api/contact`: Submit contact form data.
  - **Security**: Rate-limited to 3 requests per hour per IP.
  - **Spam Protection**: Honeypot field implementation.
  - **Notifications**: Automatically sends an email via Nodemailer.

---

## 📂 Core Logic
- **Mongoose Models**: Defines schemas for `Contact` submissions and `Project` items.
- **Transporter**: Configured with Gmail SMTP for reliable email delivery.
- **Seeding**: Includes a `seed.js` script to populate the database with initial content.

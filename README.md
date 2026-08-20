# FlavorForge AI

An AI-powered web application designed to help food businesses generate professional product descriptions, brand positioning profiles, and e-commerce-ready marketing copy using Google Gemini AI.

---

## 🌐 Live Demo
* **Production Deployment URL:** [https://flavorforge-ai.vercel.app](https://flavorforge-ai.vercel.app)

---

## 📸 Screenshots

Click the links below to view the application walkthrough screenshots:

* 🌐 **[Live App Home Page](https://github.com/Avinash00006/flavorforge-ai/blob/main/screenshots/live_homepage.png)**
* 🖥️ **[Authenticated Dashboard UI](https://github.com/Avinash00006/flavorforge-ai/blob/main/screenshots/dashboard.png)**
* 🧪 **[AI Copywriting Generation Modal](https://github.com/Avinash00006/flavorforge-ai/blob/main/screenshots/live_generation.png)**
* 🗄️ **[Database Schema Design (MongoDB Atlas)](https://github.com/Avinash00006/flavorforge-ai/blob/main/screenshots/db_schema.png)**
* 📱 **[Responsive Viewports (Desktop vs Mobile Simulation)](https://github.com/Avinash00006/flavorforge-ai/blob/main/screenshots/responsive.png)**
* ☁️ **[Vercel Deployment Dashboard](https://github.com/Avinash00006/flavorforge-ai/blob/main/screenshots/vercel_deploy.png)**
* ☁️ **[Render Deployment Dashboard](https://github.com/Avinash00006/flavorforge-ai/blob/main/screenshots/render_deploy.png)**

---

## ✨ Features

* **JWT User Authentication:** Secure credential signups, logins, and cookie-free JWT verification.
* **Google OAuth Sign-In:** One-click Google login integration using sessionless Passport.js strategy redirects.
* **Role-Based AI Generation:** Dynamically generates catalog descriptions, brand positioning matrices, and conversion-focused marketing copies based on ingredients and audience parameters.
* **Sensory Prompt Engineering:** Prompts Google Gemini with strict writing guidelines, sensory constraints (taste, aroma, pairing), and tone rules.
* **Full CRUD Operations:** Scopes creation, reading, status toggling (draft vs published), modifications, and deletions to the authenticated user ID.
* **Brute-Force Rate Limiter:** Restricts authentication routes to 5 requests per 15 minutes per IP.
* **Responsive Layouts:** Premium glassmorphism design optimized for 375px (mobile), 768px (tablet), and 1440px (desktop) viewports.
* **UX Safety Nets:** Includes React Error Boundaries, custom empty-state fallback screens, input validators, and deletion confirmation modals.
* **Search & Filter:** Dynamic client-side typing debouncer with 300ms delays to search and filter database records without flooding network ports.

---

## 🛠️ Tech Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | React / Next.js (Tailwind CSS) | Rapid client-side virtual DOM rendering and utility-first responsive layout styling. |
| **Backend** | Node.js / Express.js | Event-driven, non-blocking asynchronous I/O optimized for handling concurrent API fetches. |
| **Database** | MongoDB Atlas / Mongoose | Document-oriented store providing schema flexibility for text-fluid branding assets. |
| **AI Engine** | Google Gemini (`gemini-3.1-flash-lite`) | Generous free tier quotas, rapid latency responses, and strong context execution. |
| **Deployment** | Vercel (Frontend) & Render (Backend) | Best-in-class automated CI/CD pipeline git integrations. |

---

## ⚙️ Setup & Installation

### Prerequisite Environment Variables
Create a `.env` file in `/backend` containing:
```ini
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/flavorforge-ai
JWT_SECRET=your_jwt_signing_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Create a `.env` file in `/frontend` containing:
```ini
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Local Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Avinash00006/flavorforge-ai.git
   cd flavorforge-ai
   ```
2. **Backend Server Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. **Frontend Application Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

---

## 📡 API Documentation

### 1. Register User
* **Endpoint:** `POST /api/auth/register`
* **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@brand.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully. You can now log in.",
    "data": { "id": "64b0f9...", "name": "John Doe", "email": "john@brand.com" }
  }
  ```

### 2. Login User
* **Endpoint:** `POST /api/auth/login`
* **Request Body:**
  ```json
  {
    "email": "john@brand.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful.",
    "token": "eyJhbGciOi...",
    "data": { "id": "64b0f9...", "name": "John Doe", "email": "john@brand.com" }
  }
  ```

### 3. Generate and Save Content (Protected)
* **Endpoint:** `POST /api/content`
* **Headers:** `Authorization: Bearer <JWT_TOKEN>`
* **Request Body:**
  ```json
  {
    "title": "Spicy Mango Sauce",
    "type": "description",
    "description": "Zesty dipping sauce",
    "ingredients": "Mango, Habenero, Vinegar",
    "tone": "Energetic",
    "targetAudience": "Barbecue fans"
  }
  ```
* **Success Response (201):**
  ```json
  {
    "success": true,
    "data": {
      "id": "64c8f...",
      "title": "Spicy Mango Sauce",
      "generatedText": "Ignite your senses with this zesty blend...",
      "status": "draft"
    }
  }
  ```

---

## 📂 Architecture & Folder Structure

FlavorForge AI is structured as a monorepo containing isolated frontend and backend folders:

```text
flavorforge-ai/
├── backend/                  # Express REST API Server
│   ├── config/               # Passport.js OAuth and database configs
│   ├── controllers/          # Business logic handlers (auth, CRUD content)
│   ├── middleware/           # JWT security filters & rate limit configs
│   ├── models/               # Mongoose DB schema schemas (User, ContentItem)
│   ├── routes/               # Express endpoints router maps
│   ├── utils/                # Google Gemini prompt engineering logic
│   ├── package.json
│   └── server.js             # Main server execution hook
├── frontend/                 # Next.js Application
│   ├── app/                  # Route layouts and views (dashboard, login, profile, register)
│   ├── components/           # Navbar, footer, route guard wrapper, error boundary
│   │   └── ui/               # Reusable UI buttons, inputs, modals, empty states
│   └── package.json
├── screenshots/              # Document images directory
├── PROMPTS.md                # Prompt engineering testing logs
└── README.md                 # Project portfolio document
```

---

## 📬 Secure Contact & Feedback System Setup

The web application includes a secure **Contact Developer** form linked in the footer. It allows users to send messages directly to your email inbox without exposing your email address in the client-side code:

1. **Get an Access Key:** Go to [web3forms.com](https://web3forms.com/), submit your email, and receive your public access token key.
2. **Local Environment Config:** Paste your key in your backend `.env` file:
   ```ini
   WEB3FORMS_ACCESS_KEY=your-web3forms-access-key-here
   ```
3. **Cloud Production Setup:** In your **Render Web Service Dashboard**, navigate to **Environment Variables** and add `WEB3FORMS_ACCESS_KEY` along with your token.

---

## ⚠️ Known Limitations

* **Render Free Tier Cold Starts:** Render's free tier spins down the backend container after **15 minutes** of inactivity, causing the first API request after idleness to take **30-60 seconds** to wake up.
* **Gemini Free Tier Quotas:** The Google AI Studio free tier limits requests to 15 per minute, which may occasionally trigger a `429 Rate Limit` response during heavy concurrent usage.
* **Google OAuth Keys Requirement:** Social sign-in requires valid `GOOGLE_CLIENT_ID` credentials in the server environment, defaulting to standard form login if keys are unconfigured.

---

## 🎓 Credits & Acknowledgements

* **Google Gemini API:** Powered by the `gemini-3.1-flash-lite` model for generating high-converting food brand copy.
* **Antigravity (Google DeepMind Team):** For assistance in codebase construction, debugging, and milestone planning.
* **GEU Technology Business Incubator (TBI):** For mentorship and project guidelines during the Full Stack Web Development Internship.

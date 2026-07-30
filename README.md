# FlavorForge AI

FlavorForge AI is an AI-powered web application designed to help food businesses generate professional product descriptions, branding content, and e-commerce-ready marketing copy using Google Gemini AI.

---

## 🚀 Features

* AI-generated product descriptions
* Multiple content tone options
* Product input dashboard
* Regenerate response functionality
* Copy-to-clipboard support
* Responsive modern UI

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### AI Integration

* Google Gemini API

### Deployment

* Vercel
* Render

---

## 📦 Project Structure

frontend/
backend/

---

## 🗄️ Database Design & Architecture

We have integrated a cloud-hosted **MongoDB Atlas** database using the **Mongoose ODM**. 

### Rationale
MongoDB is a document-based NoSQL database, making it ideal for our flexible food branding datasets. Since generated marketing copies, descriptions, and profiles are schema-fluid text structures, a document model avoids heavy, unnecessary migrations and speeds up read/write latency.

### Data Model ER Diagram
Below is our database entity schema. The `User` entity has a one-to-many relationship with `ContentItem` (a user can generate many content profiles).

```mermaid
erDiagram
    User ||--o{ ContentItem : "generates"
    User {
        ObjectId _id PK
        string name
        string email UK
        string password
        date createdAt
    }
    ContentItem {
        ObjectId _id PK
        string title
        string type "description | branding | marketing"
        string description
        string ingredients
        string targetAudience
        string tone
        string generatedText
        string status "draft | published"
        ObjectId userId FK
        date createdAt
    }
```

---

## ⚙️ Setup & Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration file:
   ```bash
   copy .env.example .env
   ```
4. Update the `MONGODB_URI` inside `.env` with your MongoDB Atlas connection string.
5. Boot the API server in development mode:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:3000`.

---

## 📌 Project Goal

FlavorForge AI aims to help small and medium food processing businesses improve their digital product presentation through AI-powered content generation and branding assistance.

---

## 🌐 Live Production Deployments

FlavorForge AI is fully deployed to production in the cloud and is publicly accessible:

* **Live Frontend View:** [https://flavorforge-ai.vercel.app](https://flavorforge-ai.vercel.app) *(Vercel URL placeholder)*
* **Live API Backend Server:** [https://flavorforge-ai-api.onrender.com](https://flavorforge-ai-api.onrender.com) *(Render URL placeholder)*
* **Database Layer:** Hosted on **MongoDB Atlas** (Cloud Replica Set).

### 🛠️ Production Environment Variable Configurations

To run the application in a production environment, ensure the following parameters are populated:

#### Frontend (Vercel)
* `NEXT_PUBLIC_API_URL`: Directs API calls to the production Render server (e.g. `https://flavorforge-ai-api.onrender.com`).

#### Backend (Render)
* `FRONTEND_URL`: Points to your production Vercel frontend URL to permit CORS resource access.
* `MONGODB_URI`: Cloud database connection string.
* `JWT_SECRET`: Signature verification key for user security tokens.
* `GEMINI_API_KEY`: API Key for Google Gemini text generation.
* `GOOGLE_CALLBACK_URL`: `https://flavorforge-ai-api.onrender.com/api/auth/google/callback`

### ⚠️ Known Free Tier Limitations
Render's free tier web services spin down automatically after **15 minutes** of inactivity. The first request after a period of idleness will trigger a container cold-start, taking **30 to 60 seconds** to boot. Subsequent requests will resolve instantly.

---

## 📄 License

MIT License

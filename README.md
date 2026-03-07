# The Design Theory — Unified Next.js Application

This project has been unified into a single Next.js application, serving both the frontend and the API on a single port (3000). All backend logic from the legacy Express server has been migrated to Next.js API routes for performance and simplicity.

## 📁 Project Structure

```text
Design-Theory/
├── frontend/             # 🛠️ Main Application (Unified)
│   ├── app/
│   │   ├── api/          # 🚀 All Backend Logic (Unified API)
│   │   │   ├── enquiries/#   - Form submissions & admin management
│   │   │   ├── dashboard/#   - Admin statistics
│   │   │   ├── auth/     #   - NextAuth.js configuration
│   │   │   └── subscribe/#   - Newsletter subscriptions
│   ├── lib/              # 🔗 Shared Utilities (e.g., MongoDB connection)
│   ├── models/           # 📦 Mongoose Models (Unified)
│   └── ...
├── package.json          # 📦 Workspace scripts (proxy to frontend)
└── .env.local            # 🔑 Environment Variables
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### 2. Setup
Clone the repository and install dependencies:
```bash
npm run install:all
```

### 3. Environment Variables
Create a `frontend/.env.local` file with the following:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Development
Run the unified server in development mode:
```bash
npm run dev
```

### 5. Production Build
Prepare and start the standalone production server:
```bash
npm run build
npm run start
```

## 🛠️ Key Architectural Improvements
- **Unified Port**: Both the client and server run on port 3000, eliminating CORS issues.
- **Improved Security**: NextAuth.js and modern middleware manage admin access.
- **Robustness**: Integrated DNS fix for MongoDB Atlas connectivity in local environments.
- **Validation**: Full back-end validation on all form submissions (Enquiries).

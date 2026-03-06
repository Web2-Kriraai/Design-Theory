# The Design Theory — Interior Design & Architecture Studio

A premium, responsive website built with Next.js 16 (App Router), featuring a luxury aesthetic, dynamic content sections, and a MongoDB-integrated enquiry system.

## Project Structure

This project is built as a unified Next.js 16 application:

```text
/
├── frontend/              # Main Next.js 16 Application
│   ├── app/               # App Router pages and unified API routes
│   ├── components/        # Reusable UI components
│   ├── lib/               # Shared utilities (MongoDB Client)
│   ├── models/            # Mongoose models for DB
│   └── public/            # Optimized images and assets
├── package.json           # Root configuration
└── README.md              # Documentation
```

## Setup Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local instance running at `mongodb://127.0.0.1:27017`
- **MongoDB Compass**: For database management

### 2. Installation
From the root directory, run:
```bash
npm install
```
This will install dependencies for the entire workspace using the built-in workspace support.

### 3. Running the Development Server
To start the frontend application:
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production
```bash
npm run build
```

## MongoDB & Compass Configuration

The Inquiry form stores data in a local MongoDB database named `The_design_Theory`.

### Steps to setup Compass:
1.  **Download Compass**: Install [MongoDB Compass](https://www.mongodb.com/products/compass).
2.  **Connect**: Open Compass and use this connection string:
    `mongodb://127.0.0.1:27017`
3.  **Explore Data**:
    - Select the **The_design_Theory** database.
    - Open the **enquiry** collection.
    - Here you can view, edit, or export all submitted form data (Name, Email, Phone, Project Type, etc.).

## Features
- **Modern UI**: Dark/Light theme transitions, serif/sans-serif typography (Cormorant Garamond & Montserrat).
- **Responsive Navigation**: Transitions from transparent to sticky with a shrinking logo effect.
- **Portfolio filtering**: Client-side project filtering (Residential, Commercial, Architecture).
- **Inquiry Form**: Real-time validation, 10-digit phone enforcement, and MongoDB persistence.

---
*Created for The Design Theory.*

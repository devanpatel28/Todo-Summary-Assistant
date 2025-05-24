# Todo Summary Assistant

A full-stack web application to manage todos, store them in Firebase Firestore, summarize them using Cohere’s LLM, and send summaries to a Slack channel. The frontend is built with React, Vite, Radix UI, and Tailwind CSS v4, providing a modern, accessible UI. The backend uses Node.js with Express, Firebase Functions, and integrates with Cohere and Slack.
## Live URL
- https://todo-summary-assistant-kappa.vercel.app/

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Slack and LLM Setup Guidance](#slack-and-llm-setup-guidance)
- [Design and Architecture Decisions](#design-and-architecture-decisions)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Features
- **Todo Management**: Add, delete, and list todos stored in Firebase Firestore.
- **Summarization**: Generate summaries of todos using Cohere’s LLM.
- **Slack Integration**: Send todo summaries to a specified Slack channel via webhooks.
- **Accessible UI**: Modern, responsive frontend with Radix UI components and Tailwind CSS styling.
- **Loading States**: Spinners for adding, deleting, and summarizing todos to enhance UX.
- **Error Handling**: Robust error boundaries and alerts for failed operations.

## Tech Stack
- **Frontend**:
  - React 18
  - Vite (build tool)
  - Radix UI (accessible components)
  - Tailwind CSS v4 (styling)
  - Axios (API requests)
- **Backend**:
  - Node.js with Express
  - Firebase Firestore (database)
  - Cohere (LLM for summarization)
  - Slack Webhooks (notifications)


## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase account
- Slack workspace (for webhook)
- Cohere account (for API key)
- Git

### Backend Setup
1. **Navigate to Backend**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Firebase**:
   - Install Firebase CLI:
     ```bash
     npm install -g firebase-tools
     firebase login
     ```
   - Initialize Firebase (if not already done):
     ```bash
     firebase init functions
     ```
     - Select your Firebase project and choose JavaScript.
     - Overwrite `functions/package.json` and `functions/index.js` if prompted, but keep custom code.

4. **Configure Environment Variables**:
   - Create `backend/.env` based on [Environment Variables](#environment-variables) below.
   - Example:
     ```bash
     echo "FIREBASE_API_KEY=your-api-key" > .env
     echo "COHERE_API_KEY=your-cohere-key" >> .env
     echo "SLACK_WEBHOOK_URL=your-slack-webhook" >> .env
     ```

5. **Run Backend Locally**:
   ```bash
   npm run start
   ```
   - Backend runs on `http://localhost:5000`.

### Frontend Setup
1. **Navigate to Frontend**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create `frontend/.env`:
     ```bash
     echo "VITE_API_URL=http://localhost:5000/api" > .env
     ```

4. **Run Frontend Locally**:
   ```bash
   npm run dev
   ```
   - Frontend runs on `http://localhost:5173`.

### Verify Setup
- Open `http://localhost:5173`.
- Add a todo, delete it, and summarize todos.
- Check Slack for summaries and Firestore for stored todos.

## Slack and LLM Setup Guidance

### Slack Setup
1. **Create a Slack App**:
   - Go to [Slack API](https://api.slack.com/apps) and create a new app.
   - Enable **Incoming Webhooks** under Features.
   - Add a webhook for your desired channel and copy the URL (e.g., `https://hooks.slack.com/services/xxx/yyy/zzz`).

2. **Set Webhook in Environment**:
   - Add the webhook URL to `backend/.env`:
     ```
     SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
     ```

### LLM Setup (Cohere)
1. **Create a Cohere Account**:
   - Sign up at [Cohere](https://cohere.ai/) and get an API key.

2. **Set API Key in Environment**:
   - Add to `backend/.env`:
     ```
     COHERE_API_KEY=your-cohere-api-key
     ```

3. **Test Summarization**:
   - Add todos via the frontend.
   - Click “Summarize & Send to Slack” to test Cohere’s summarization.
   - Check the Radix UI dialog for the summary and Slack for the message.

## Design and Architecture Decisions

### Frontend
- **React with Vite**:
  - Chosen for fast development and hot module replacement.
  - Vite provides a lightweight, modern alternative to Create React App.
- **Radix UI**:
  - Used for accessible, unstyled components (e.g., `Button`, `Dialog`, `TextField`).
  - Ensures WAI-ARIA compliance and keyboard navigation.
  - `@radix-ui/themes` provides pre-styled components for quick setup.
- **Tailwind CSS v4**:
  - Utility-first CSS for rapid, responsive styling.
  - `@tailwindcss/postcss` used for compatibility with Vite and PostCSS.
  - Simplifies custom styling (e.g., spinner animation).
- **Axios**:
  - Preferred for clean, promise-based HTTP requests to the backend.
  - Handles errors gracefully with try-catch blocks.
- **Loading Spinners**:
  - Custom CSS spinner for add, delete, and summarize actions to improve UX.
  - Integrated with Radix UI `Flex` for centering.
- **Error Handling**:
  - `ErrorBoundary` component catches rendering errors.
  - Alerts for failed API calls (e.g., `Failed to fetch todos`).
- **State Management**:
  - Simple `useState` in `App.jsx` for todos, avoiding complex libraries like Redux for a small app.
  - `useEffect` fetches todos on mount for initial data.

### Backend
- **Node.js with Express**:
  - Lightweight, flexible framework for API endpoints (`/api/todos`, `/api/summarize`).
  - Deployed as Firebase Functions for serverless scaling.
- **Firebase Firestore**:
  - NoSQL database for storing todos (`id`, `title`, `createdAt`).
  - Chosen for real-time capabilities and Firebase integration.
  - Simple schema: `todos` collection with documents.
- **Cohere LLM**:
  - Used for summarizing todos due to its robust text generation API.
  - Integrated via `cohere-ai` package with error handling.
- **Slack Webhooks**:
  - Simple, reliable way to send summaries to Slack without a full Slack app.
  - Webhook URL stored securely in `.env`.
- **Modular Structure**:
  - **Controllers** (`todoController.js`): Handle HTTP requests and responses.
  - **Models** (`todoModel.js`): Firestore operations (add, get, delete).
  - **Services** (`summaryService.js`): Business logic for summarization and Slack.
  - Separation of concerns improves maintainability.

### Architecture
- **Client-Server Model**:
  - Frontend communicates with backend via REST API (`GET /api/todos`, `POST /api/todos`, etc.).
  - Backend handles Firestore, Cohere, and Slack interactions.
- **Serverless Deployment**:
  - Firebase Functions for backend reduces server management.
  - Firebase Hosting for frontend ensures fast, scalable delivery.
- **Error Handling**:
  - Backend logs errors (`console.error`) and returns 500 status codes.
  - Frontend alerts users and logs to console for debugging.
- **Scalability**:
  - Firestore scales automatically for todo storage.
  - Firebase Functions handle API traffic efficiently.
- **Security**:
  - Environment variables store sensitive keys (`FIREBASE_API_KEY`, `COHERE_API_KEY`, `SLACK_WEBHOOK_URL`).
  - Firestore rules allow read/write (simplified for demo; production needs stricter rules).

## Environment Variables

### `.env.example`
Create `backend/.env` and `frontend/.env` based on the following:

```plaintext
# backend/.env
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
COHERE_API_KEY=your-cohere-api-key
SLACK_WEBHOOK_URL=your-slack-webhook-url

# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

## Deployment
- **Backend**: Deployed on Render
- **Frontend**: Deployed on Vercel

### Notes
- **Backend**:
  - Firebase keys are found in Firebase Console > Project Settings > General > Your apps > Web app.
  - `COHERE_API_KEY` from Cohere dashboard.
  - `SLACK_WEBHOOK_URL` from Slack app webhook setup.
- **Frontend**:
  - `VITE_API_URL` points to the backend API. Update to deployed URL (e.g., Render) for production.

**License**: MIT  
**Author**: Devan Bhensdadiya  
**Contact**: devanbhensdadiya123@gmail.com

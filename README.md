# 🚀 ExamNotes AI

AI-powered notes generation platform built using the MERN stack.
Generate structured notes, diagrams, and PDFs with a credit-based system powered by Stripe.

🔗 **Live Demo:** https://your-live-link.com

---

## 📌 Problem Statement

Students spend a lot of time creating structured notes from scattered resources.
This project solves that by using AI to **instantly generate organized notes, diagrams, and summaries**, saving time and improving productivity.

---

## 🔥 Key Highlight (What Makes This Project Stand Out)

* 💳 **Stripe-based Credit System**
  Users purchase credits via Stripe and use them to generate AI-powered notes.

* 🤖 **AI Notes Generation Pipeline**
  Converts raw input into structured notes + diagrams (Mermaid) + downloadable PDFs.

* 📊 **Data Visualization**
  Uses Recharts to present insights in a clean and interactive format.

---

## ⚙️ How It Works

1. User signs up / logs in
2. Purchases credits using Stripe
3. Credits are stored in MongoDB
4. User inputs topic/content
5. AI generates structured notes
6. Credits are deducted per request
7. User can view, download, or visualize notes

---

## 🧠 Architecture

Frontend (React) → Backend (Node.js / Express) → MongoDB

* Stripe handles secure payments
* Backend manages authentication & credit logic
* Frontend communicates with APIs and renders UI

---

## 🏗️ Folder Structure

```
ExamNotesAi/
│
├── client/        # React frontend (UI, API calls, state management)
│
├── server/        # Node.js backend (API, auth, Stripe, DB logic)
│
├── README.md
└── .gitignore
```

### 📂 Explanation

* **client/**

  * Handles UI, user interactions, API integration
  * Uses React, Redux, Tailwind CSS

* **server/**

  * Handles authentication, business logic, and APIs
  * Integrates Stripe for payments
  * Connects to MongoDB

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Redux
* Tailwind CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**Other Tools**

* Stripe (Payments)
* Recharts (Data Visualization)
* Mermaid (Diagram Generation)

---

## 🚧 Challenges Faced

* Managing authentication state after Stripe payment redirects
* Synchronizing frontend state with backend credit updates
* Handling async AI response flows efficiently
* Designing a scalable credit-based usage system

---

## 📸 Screenshots

**Authontication Page**

<img width="1919" height="934" alt="image" src="https://github.com/user-attachments/assets/0adff120-1d6a-4521-9e5d-168c6e2c607a" />

**Home Page**

<img width="1790" height="4030" alt="ExamNotesAi_HomePage" src="https://github.com/user-attachments/assets/7ad85719-6413-4c84-a5c4-f6d5cbc7e338" />

**Notes Generating page**

<img width="1790" height="1836" alt="ExamNotesAi_NotesGenerationPage" src="https://github.com/user-attachments/assets/ed07201e-5c66-4129-9f02-43da27a60003" />

**History Page**

<img width="2982" height="1836" alt="ExamNotesAi_HistoryPage" src="https://github.com/user-attachments/assets/3f2614de-eac4-4b4b-82d1-1b12e8927acc" />

**Payment Page**
<img width="2982" height="1836" alt="ExamNotesAi_PaymentPage" src="https://github.com/user-attachments/assets/a4c9b586-4b77-4816-bfbb-fdb1d769b856" />


---

## ⚡ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/ExamNotesAi.git
```

### 2. Install dependencies

```
cd client && npm install
cd ../server && npm install
```

### 3. Setup environment variables

Create `.env` files in both client and server

### 4. Run the project

```
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

## 📈 Future Improvements

* Improve AI accuracy and customization
* Add user history tracking
* Enhance UI/UX
* Implement caching for faster responses

---

## 👨‍💻 Author

**Mallikarjuna Yadav**
Full Stack Developer (MERN)

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub — it helps!

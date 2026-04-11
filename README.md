# Kush Goel — Personal Portfolio (kush-portfolio)

> Live: https://kush-portfolio-virid.vercel.app  
> A clean, responsive portfolio built with React + Vite to showcase projects, skills, and contact details.

---

## 🚀 Overview
This repository contains the source for **Kush Goel's** portfolio website. The site is built for fast performance, SEO-friendly delivery, and easy deployment on Vercel.

---

## ✨ Highlights / Features
- Responsive single-page portfolio (hero, projects, skills, experience, education, contact)
- Floating portfolio chatbot with streaming replies and source badges
- SEO-ready: includes `generate-sitemap.js` and `SEO_SETUP_GUIDE.md`
- Fast build using **Vite + React**
- Tailwind CSS for utility-first styling
- Simple deploy pipeline (Vercel recommended)

## 🤖 Chatbot Setup
The chatbot uses a server-side Gemini API route in `api/chat.js`.

Create a local `.env` file from `.env.example` and set:

```bash
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.0-flash
```

If the API is unavailable, the widget falls back to a local response mode so the site still works during development.

---

## 🧰 Tech Stack
- **Frontend:** React, Vite  
- **Styling:** Tailwind CSS  
- **Build & Dev:** npm, Vite  
- **Hosting:** Vercel (deployed at kush-portfolio-virid.vercel.app)

---

## 📦 Installation & Local Development

### Prerequisites
Make sure you have Node.js and npm installed:
```bash
node -v
npm -v

# 🎮 AI Game Idea Generator

> **Create original game concepts with AI — from idea to visual layout.**  
> Built with **FastAPI**, **OpenAI API**, and **React (Vite)**.

---

## 🧠 What It Does

The **AI Game Idea Generator** is a creative assistant that helps you design unique video game concepts using natural language input.  
Simply describe your idea (e.g. *"I want a 2D cyberpunk platformer with boss fights and a crafting system"*) and the app will generate:

- 🏷️ **Game Title**
- 🧩 **Genre**
- 🧍 **Main Character & Backstory**
- ⚙️ **Gameplay Mechanics**
- 🗺️ **Level Progression** (JSON-based)
- 🎨 **Visual Style Suggestions**

## 🧩 Tech Stack

### Frontend:

- ⚛️ React + Vite
- 🎨 Animated background (gradient + particle effects)
- 🧱 Modern component-based architecture

### Backend:

- ⚡ FastAPI (Python)
- 🧠 OpenAI GPT-4 API
- 🧰 Modular structure: routers/, services/, .env config

## ⚙️ Installation & Setup
### 🖥️ 1. Clone the repository

```bash
git clone https://github.com/dmitar-strbac/ai-game-idea-generator.git  
cd ai-game-idea-generator
```

### 🚀 2. Backend Setup (FastAPI)

```bash
cd backend  
python -m venv venv  
source venv/bin/activate     # or venv\Scripts\activate on Windows  
pip install -r requirements.txt
```

Create a .env file in /backend:
```bash
OPENAI_API_KEY=your_api_key_here
```

Run the server:
```bash
uvicorn app:app --reload
```

The backend will start at: http://127.0.0.1:8000

### ⚛️ 3. Frontend Setup (React + Vite)

```bash
cd frontend  
npm install  
npm run dev 
``` 
Open http://localhost:5173 in your browser.

## 🧑‍💻 Author

**Dmitar Štrbac**  
📍 Faculty of Technical Sciences, University of Novi Sad  
📧 Contact: dmitarstrbac@gmail.com  
🗓️ 2025

## 📜 License

This project is licensed under the Apache License 2.0 — see the [LICENSE](./LICENSE) file for details.
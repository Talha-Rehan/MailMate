# 📧 MailMate

> **Read less. Reply smarter. Powered by Grok AI.**

MailMate is a Chrome extension that supercharges your Gmail workflow — it extracts email content, generates an instant AI summary, and drafts a tone-customized reply directly into Gmail's compose box, ready for you to send with one click.

---

## 🎬 Demo

> <img width="1901" height="901" alt="image" src="https://github.com/user-attachments/assets/8cd347a7-445e-4617-8a55-36e5b0e3cb82" />


---

## ✨ Features

- **⚡ Instant Email Summarization** — Extracts the full email body from Gmail and sends it to Grok AI for a clean, concise summary — no more reading walls of text
- **🎭 Tone Selection** — Choose the tone of your reply: Professional, Friendly, Formal, Assertive, or Empathetic — the AI adapts its language accordingly
- **✍️ Custom Reply Details** — Add specific points or context you want included in the reply before it's generated
- **📬 Auto-Inject into Gmail** — The generated reply is automatically inserted into Gmail's compose/reply box, ready to review and send
- **🔒 Secure Backend Proxy** — API calls to Grok are routed through a Node.js backend, keeping your API key off the client

---

## 🛠️ Tech Stack

### Extension
![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Manifest V3](https://img.shields.io/badge/Manifest_V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

### AI
![Grok](https://img.shields.io/badge/Grok_AI-000000?style=for-the-badge&logo=x&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites

- Google Chrome browser
- Node.js `v18+`
- Grok API key (via [x.ai](https://x.ai/api))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mailmind.git
cd mailmind
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
GROK_API_KEY=your_grok_api_key
```

Start the backend server:

```bash
npm run dev
```

> The backend must be running locally for the extension to function.

### 3. Load the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in the top-right corner)
3. Click **"Load unpacked"**
4. Select the `extension/` folder from this repository

The MailMind icon will appear in your Chrome toolbar.

---

## 📁 Project Structure

```
mailmind/
├── extension/
│   ├── manifest.json         # Extension config (Manifest V3)
│   ├── content.js            # Extracts email content from Gmail DOM
│   ├── popup.html            # Extension popup UI
│   ├── popup.js              # Popup logic: tone selection, details input
│   ├── background.js         # Service worker for message passing
│   └── icons/                # Extension icons
├── backend/
│   ├── server.js             # Express server entry point
│   ├── routes/
│   │   └── ai.js             # /summarise and /reply endpoints
│   ├── services/
│   │   └── grok.js           # Grok API integration
│   └── .env
└── README.md
```

---

## 🔄 How It Works

```
Gmail Page
    │
    ├─ content.js extracts email body from DOM
    │
    ▼
Extension Popup
    ├─ Displays AI-generated summary
    ├─ User selects tone (Professional / Friendly / Formal etc.)
    └─ User adds optional context/details
    │
    ▼
Node.js Backend
    ├─ POST /api/summarise  →  Grok API  →  returns summary
    └─ POST /api/reply      →  Grok API  →  returns drafted reply
    │
    ▼
content.js
    └─ Auto-injects generated reply into Gmail's compose box
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/summarise` | Accepts email body, returns AI summary |
| `POST` | `/api/reply` | Accepts email body + tone + details, returns drafted reply |

**Example request to `/api/reply`:**

```json
{
  "emailBody": "Hi, I wanted to follow up on the proposal...",
  "tone": "Professional",
  "details": "Mention that we can schedule a call next Tuesday"
}
```

---

## 🎭 Available Tones

| Tone | Use Case |
|------|----------|
| 🏢 Professional | Work emails, client communication |
| 😊 Friendly | Colleagues, casual business |
| 📜 Formal | Legal, academic, official correspondence |
| 💪 Assertive | Negotiations, follow-ups |
| 💙 Empathetic | Support, sensitive topics |

---

## ⚠️ Permissions

This extension requests the following Chrome permissions:

| Permission | Reason |
|------------|--------|
| `activeTab` | Access the current Gmail tab to extract email content |
| `scripting` | Inject the reply into Gmail's compose box |
| `storage` | Save user preferences (tone defaults) |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Talha Rehan**   
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Talha-Rehan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/talha-rehan-120b7b2a6)

---

> *Your inbox, handled.* 🧠

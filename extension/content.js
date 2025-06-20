console.log("✅ Mail AI content script loaded!");

let currentUrl = location.href;
let aiButtonVisible = false;

function isEmailOpened(url) {
  // Gmail opens email if URL contains /#inbox/<someID>
  return (
    url.includes("#inbox/") ||
    url.includes("#search/") ||
    url.includes("#label/")
  );
}

function addAIButton() {
  if (document.getElementById("mail-ai-button")) return;

  const button = document.createElement("button");
  button.id = "mail-ai-button";
  button.innerText = "🧠 AI Assist";

  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 10000,
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  });

  button.addEventListener("click", () => {
    if (!document.getElementById("mail-ai-modal")) {
      showModal();
    }
  });

  document.body.appendChild(button);
  aiButtonVisible = true;
  console.log("✅ AI button injected.");
}

function removeAIButton() {
  const btn = document.getElementById("mail-ai-button");
  if (btn) {
    btn.remove();
    aiButtonVisible = false;
    console.log("❌ AI button removed.");
  }
}

// Check URL change every 500ms
setInterval(() => {
  const newUrl = location.href;
  if (newUrl !== currentUrl) {
    currentUrl = newUrl;
    console.log("🔄 URL changed:", currentUrl);

    if (isEmailOpened(currentUrl)) {
      addAIButton();
    } else {
      removeAIButton();
    }
  }
}, 500);

// ============ Modal Function (unchanged) ============
function showModal() {
  const modal = document.createElement("div")
  modal.id = "mail-ai-modal"

  // Add CSS animations and styles
  const styles = `
    <style>
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }

      .modal-backdrop {
        backdrop-filter: blur(4px);
        animation: fadeIn 0.3s ease-out;
      }

      .modal-content {
        animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
        overflow: hidden;
      }

      .modal-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
        animation: shimmer 2s infinite;
      }

      .modal-inner {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        margin: 8px;
        padding: 24px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        max-height: calc(100vh - 40px);
        overflow-y: auto;
      }

      .ai-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 12px;
        color: white;
        cursor: pointer;
        font-weight: 600;
        padding: 12px 20px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
        font-size: 14px;
        position: relative;
        overflow: hidden;
      }

      .ai-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }

      .ai-button:hover::before {
        left: 100%;
      }

      .ai-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      }

      .ai-button:active {
        transform: translateY(0);
      }

      .ai-button.summarize {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      }

      .ai-button.summarize:hover {
        box-shadow: 0 8px 25px rgba(17, 153, 142, 0.4);
      }

      .ai-button.reply {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .ai-button.copy {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }

      .ai-button.copy:hover {
        box-shadow: 0 8px 25px rgba(240, 147, 251, 0.4);
      }

      .ai-button.close {
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        color: #333;
      }

      .content-box {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 12px;
        padding: 16px;
        margin-top: 12px;
        border-left: 4px solid #667eea;
        animation: fadeIn 0.5s ease-out;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        max-height: 150px;
        overflow-y: auto;
      }

      .reply-box {
        background: linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%);
        border-left: 4px solid #11998e;
        max-height: 180px;
        overflow-y: auto;
      }

      .loading {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        height: 20px;
        margin: 8px 0;
      }

      .ai-select {
        background: white;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        padding: 10px;
        width: 100%;
        transition: all 0.3s ease;
        font-size: 14px;
      }

      .ai-select:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        outline: none;
      }

      .ai-input {
        background: white;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        padding: 12px;
        width: 100%;
        transition: all 0.3s ease;
        font-size: 14px;
        box-sizing: border-box;
      }

      .ai-input:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        outline: none;
      }

      .ai-input::placeholder {
        color: #a0a0a0;
      }

      .divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e1e5e9, transparent);
        margin: 20px 0;
        border: none;
      }

      .modal-title {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
        text-align: center;
      }

      .section-label {
        color: #4a5568;
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 8px;
        display: block;
      }

      .icon {
        display: inline-block;
        margin-right: 8px;
        font-size: 16px;
      }

      .status-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #11998e;
        margin-right: 8px;
        animation: pulse 2s infinite;
      }

      .content-box::-webkit-scrollbar,
      .modal-inner::-webkit-scrollbar {
        width: 6px;
      }

      .content-box::-webkit-scrollbar-track,
      .modal-inner::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.1);
        border-radius: 3px;
      }

      .content-box::-webkit-scrollbar-thumb,
      .modal-inner::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 3px;
      }

      .content-box::-webkit-scrollbar-thumb:hover,
      .modal-inner::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      }
    </style>
  `

  document.head.insertAdjacentHTML("beforeend", styles)

  Object.assign(modal.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 10001,
  })

  modal.className = "modal-backdrop"

  modal.innerHTML = `
    <div class="modal-content" style="
      width: 420px;
      max-height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10002;
      display: flex;
      flex-direction: column;
      border-radius: 20px 0 0 20px;
      box-shadow: -10px 0 30px rgba(0,0,0,0.2);
    ">
      <div class="modal-inner">
        <h3 class="modal-title">
          <span class="icon">🤖</span>AI Email Assistant
        </h3>

        <button id="summarize-btn" class="ai-button summarize">
          <span class="icon">📋</span>Summarize Email
        </button>
        
        <div id="summary-box" class="content-box" style="display: none;">
          <div class="status-indicator"></div>
          <strong>Email Summary</strong>
          <div id="summary-text" style="margin-top: 8px; line-height: 1.5;"></div>
        </div>

        <hr class="divider">

        <label for="tone-select" class="section-label">
          <span class="icon">🎭</span>Reply Tone
        </label>
        <select id="tone-select" class="ai-select">
          <option value="formal">🎩 Formal & Professional</option>
          <option value="casual">😊 Casual & Relaxed</option>
          <option value="friendly">🤝 Friendly & Warm</option>
          <option value="enthusiastic">🚀 Enthusiastic & Energetic</option>
          <option value="concise">⚡ Brief & To the Point</option>
        </select>

        <label for="reply-note" class="section-label" style="margin-top: 16px;">
          <span class="icon">💭</span>Additional Instructions
        </label>
        <input type="text" id="reply-note" class="ai-input" placeholder="e.g., mention our meeting next week..." />

        <button id="reply-btn" class="ai-button reply" style="margin-top: 16px;">
          <span class="icon">✨</span>Generate Smart Reply
        </button>
        
        <div id="reply-box" class="content-box reply-box" style="display: none;">
          <div class="status-indicator"></div>
          <strong>Generated Reply</strong>
          <div id="reply-text" style="margin-top: 8px; line-height: 1.5;"></div>
        </div>

        <button id="copy-to-gmail-btn" class="ai-button copy" style="display: none; margin-top: 12px;">
          <span class="icon">📧</span>Insert into Gmail
        </button>

        <button id="close-ai" class="ai-button close" style="margin-top: 16px;">
          <span class="icon">👋</span>Close Assistant
        </button>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  const getEmailContent = () => {
    const emailBodyDiv = document.querySelector("div.a3s.aiL")
    return emailBodyDiv?.innerText.trim() || ""
  }

  // Enhanced summarize functionality
  document.getElementById("summarize-btn").addEventListener("click", () => {
    const emailText = getEmailContent()
    if (!emailText) {
      showNotification("⚠️ Could not extract email content.", "warning")
      return
    }

    const summaryBox = document.getElementById("summary-box")
    const summaryText = document.getElementById("summary-text")

    summaryBox.style.display = "block"
    summaryText.innerHTML =
      '<div class="loading"></div><div class="loading" style="width: 80%;"></div><div class="loading" style="width: 60%;"></div>'

    fetch("http://localhost:3000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailText }),
    })
      .then((res) => res.json())
      .then((data) => {
        summaryText.innerHTML = `<div style="color: #2d3748; font-size: 13px;">${data.summary}</div>`
        showNotification("✅ Email summarized successfully!", "success")
      })
      .catch((err) => {
        console.error("Summarize error:", err)
        summaryText.innerHTML = '<div style="color: #e53e3e;">❌ Failed to summarize email. Please try again.</div>'
        showNotification("❌ Failed to summarize email.", "error")
      })
  })

  // Enhanced reply functionality
  document.getElementById("reply-btn").addEventListener("click", () => {
    const emailText = getEmailContent()
    const selectedTone = document.getElementById("tone-select").value
    const customPrompt = document.getElementById("reply-note").value.trim()
    const replyBox = document.getElementById("reply-box")
    const replyText = document.getElementById("reply-text")

    if (!emailText) {
      showNotification("⚠️ Could not extract email content.", "warning")
      return
    }

    replyBox.style.display = "block"
    replyText.innerHTML =
      '<div class="loading"></div><div class="loading" style="width: 90%;"></div><div class="loading" style="width: 70%;"></div>'

    fetch("http://localhost:3000/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailText,
        tone: selectedTone,
        userPrompt: customPrompt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        replyText.innerHTML = `<div style="color: #2d3748; font-size: 13px; white-space: pre-wrap;">${data.reply}</div>`

        const copyBtn = document.getElementById("copy-to-gmail-btn")
        copyBtn.style.display = "block"
        copyBtn.style.animation = "fadeIn 0.5s ease-out"

        copyBtn.onclick = () => {
          insertReplyToGmail(data.reply)
          showNotification("📧 Reply inserted into Gmail!", "success")
          setTimeout(() => document.body.removeChild(modal), 1000)
        }

        showNotification("✨ Smart reply generated!", "success")
      })
      .catch((err) => {
        console.error("Reply error:", err)
        replyText.innerHTML = '<div style="color: #e53e3e;">❌ Failed to generate reply. Please try again.</div>'
        showNotification("❌ Failed to generate reply.", "error")
      })
  })

  // Enhanced Gmail integration
  function insertReplyToGmail(replyContent) {
    const replyButton = document.querySelector('div[role="button"][data-tooltip^="Reply"]')
    if (replyButton) {
      replyButton.click()
    }

    const waitForEditor = setInterval(() => {
      const editor = document.querySelector('div[aria-label="Message Body"][contenteditable="true"]')
      if (editor && editor.offsetParent !== null) {
        clearInterval(waitForEditor)

        const subjectMatch = replyContent.match(/Subject:\s*(.*)/i)
        const body = replyContent.replace(/Subject:.*\n/i, "").trim()

        editor.focus()
        editor.innerHTML = body.replace(/\n/g, "<br>")
        editor.scrollIntoView({ behavior: "smooth", block: "center" })

        if (subjectMatch) {
          const subjectInput = document.querySelector('input[name="subjectbox"]')
          if (subjectInput && subjectInput.value.trim() === "") {
            subjectInput.value = subjectMatch[1]
          }
        }
      }
    }, 500)

    setTimeout(() => clearInterval(waitForEditor), 10000)
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${
        type === "success"
          ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
          : type === "error"
            ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      };
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 10003;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideInRight 0.3s ease-out reverse"
      setTimeout(() => document.body.removeChild(notification), 300)
    }, 3000)
  }

  // Close functionality
  document.getElementById("close-ai").addEventListener("click", () => {
    modal.style.animation = "fadeIn 0.3s ease-out reverse"
    setTimeout(() => document.body.removeChild(modal), 300)
  })

  // Click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.animation = "fadeIn 0.3s ease-out reverse"
      setTimeout(() => document.body.removeChild(modal), 300)
    }
  })
}

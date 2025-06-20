const axios = require('axios');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const generateReply = async (req, res) => {
  const { emailText, tone, userPrompt } = req.body;

  if (!emailText || !tone) {
    return res.status(400).json({ error: "Missing emailText or tone" });
  }

  const instruction = `Reply to the following email in a ${tone} tone. ${userPrompt ? "Additional instructions: " + userPrompt : ""}`;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an AI assistant that writes email replies." },
          { role: "user", content: `${instruction}\n\nEmail:\n${emailText}` }
        ],
        temperature: 0.7,
        max_tokens: 300
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices?.[0]?.message?.content?.trim();
    res.json({ reply });

  } catch (err) {
    console.error("❌ Groq reply error:", err.response?.data || err.message);
    res.status(500).json({ error: "Groq failed to generate reply" });
  }
};

module.exports = { generateReply };

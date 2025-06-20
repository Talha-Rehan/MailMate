const axios = require('axios');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const summarizeEmail = async (req, res) => {
  const { emailText } = req.body;

  if (!emailText) {
    return res.status(400).json({ error: "Missing emailText" });
  }

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Summarize the following email briefly highlighting important details:\n\n${emailText}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const summary = response.data.choices?.[0]?.message?.content?.trim();
    res.json({ summary });

  } catch (err) {
    console.error("❌ Groq API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Groq summarization failed" });
  }
};

module.exports = { summarizeEmail };

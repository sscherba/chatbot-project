// chatbot-project/backend/api/chat.js

const { Configuration, OpenAIApi } = require("openai");

// Vercel serverless function format
module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { userMessage } = req.body;

    // Use environment variables for your API key
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      });

      const reply = response.data.choices[0].message.content;
      return res.status(200).json({ reply });
    } catch (error) {
      console.error("OpenAI API error:", error);
      return res.status(500).json({ error: "OpenAI API error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

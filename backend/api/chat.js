const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use Render's environment variables
});
const openai = new OpenAIApi(configuration);

// Route for the chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { userMessage } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Or your preferred model
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

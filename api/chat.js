// backend/api/chat.js

const { Configuration, OpenAIApi } = require("openai");

module.exports = async (req, res) => {
  // 1. Set CORS headers so the browser allows requests from your GitHub Pages site
  // Replace '*' with your domain for production, e.g.: 'https://sscherba.github.io'
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2. Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    // Respond OK to the preflight
    return res.status(200).end();
  }

  // 3. For POST requests, process the userMessage
  if (req.method === "POST") {
    const { userMessage } = req.body;

    // 4. Configure OpenAI client with your API key from environment variables
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      // 5. Send the userMessage to the OpenAI API
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", 
        messages: [
          { role: "system", content: "You are a high school student named Nikki who is learning DBT skills." },
          { role: "user", content: userMessage },
        ],
      });

      // 6. Extract the AI's reply from the response
      const reply = response.data.choices[0].message.content;
      return res.status(200).json({ reply });
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return res.status(500).json({ error: "OpenAI API error" });
    }
  } else {
    // 7. Reject any other methods (GET, PUT, DELETE, etc.)
    return res.status(405).json({ error: "Method not allowed" });
  }
};

// chatbot-project/frontend/script.js

// Adjust this URL once you have your Vercel deployment URL
const BACKEND_URL = "https://chatbot-project-pink.vercel.app";

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("userMessage");
const sendBtn = document.getElementById("send-btn");

// Event listener for the Send button
sendBtn.addEventListener("click", sendMessage);

// Also send message when pressing Enter
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Display the user's bubble
  displayBubble(userMessage, "user-bubble");

  // Send the message to the backend
  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.reply) {
        // Display the bot's bubble
        displayBubble(data.reply, "bot-bubble");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      displayBubble("Oops, something went wrong.", "bot-bubble");
    })
    .finally(() => {
      userInput.value = "";
    });
}

function displayBubble(text, className) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", className);
  bubble.innerText = text;
  chatContainer.appendChild(bubble);

  // Scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// The backend endpoint hosted on Render
const BACKEND_URL = "https://chatbot-project-2nt6.onrender.com/api/chat";

// DOM Elements
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("userMessage");
const sendBtn = document.getElementById("send-btn");

// Event listener for the "Send" button
sendBtn.addEventListener("click", sendMessage);

// Allow pressing "Enter" to send a message
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Function to send a message
function sendMessage() {
  const userMessage = userInput.value.trim();

  if (!userMessage) {
    displayBubble("Please type a message!", "bot-bubble");
    return;
  }

  // Display the user's message
  displayBubble(userMessage, "user-bubble");

  // Send the message to the backend
  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.reply) {
        displayBubble(data.reply, "bot-bubble");
      } else {
        displayBubble("Sorry, I didn't get that.", "bot-bubble");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      displayBubble("Oops, something went wrong. Please try again.", "bot-bubble");
    })
    .finally(() => {
      // Clear the input field
      userInput.value = "";
    });
}

// Function to display a chat bubble
function displayBubble(text, className) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", className);
  bubble.innerText = text;
  chatContainer.appendChild(bubble);

  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

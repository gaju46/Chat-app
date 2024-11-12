// Sample messages to pre-load in the chat (for demonstration)
const messages = {
  "Family Chat": [
      { sender: "Mom", text: "How's everyone doing?", type: "received" },
      { sender: "You", text: "I'm doing great!", type: "sent" },
      { sender: "Dad", text: "Let's plan for the weekend.", type: "received" }
  ],
  "Work Team": [
      { sender: "Boss", text: "Meeting at 10 AM", type: "received" },
      { sender: "You", text: "Noted!", type: "sent" }
  ],
  "Friends": [
      { sender: "Alice", text: "Let's hang out this weekend.", type: "received" },
      { sender: "You", text: "I'm in!", type: "sent" }
  ]
};

// Select chat elements
const chatBox = document.getElementById('chat-box');
const chatTitle = document.getElementById('chat-title');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
let activeChat = 'Family Chat';  // Default active chat

// Load chat messages
function loadMessages(chatName) {
  chatBox.innerHTML = '';
  const chatMessages = messages[chatName] || [];
  chatMessages.forEach(msg => addMessage(msg.text, msg.type));
}

// Add new message to chat
function addMessage(text, type = 'sent') {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', type);
  const messageText = document.createElement('div');
  messageText.classList.add('text');
  messageText.textContent = text;
  messageDiv.appendChild(messageText);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Switch chat group
document.querySelectorAll('.group').forEach(group => {
  group.addEventListener('click', function() {
      document.querySelector('.group.active').classList.remove('active');
      group.classList.add('active');
      activeChat = group.textContent;
      chatTitle.textContent = activeChat;
      loadMessages(activeChat);
  });
});

// Send new message
sendBtn.addEventListener('click', () => {
  const messageText = messageInput.value;
  if (messageText) {
      addMessage(messageText, 'sent');
      messages[activeChat].push({ sender: "You", text: messageText, type: "sent" });
      messageInput.value = ''; // Clear input field
  }
});

// Initialize chat with default group
loadMessages(activeChat);

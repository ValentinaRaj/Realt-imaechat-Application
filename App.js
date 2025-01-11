document.addEventListener("DOMContentLoaded", () => {
  const signInPage = document.getElementById("sign-in-page");
  const chatPage = document.getElementById("chat-page");
  const signInButton = document.getElementById("sign-in-button");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameDisplay = document.getElementById("username-display");
  const logoutButton = document.getElementById("logout-button");
  const createGroupButton = document.getElementById("create-group-button");
  const groupList = document.getElementById("group-list");
  const sendButton = document.getElementById("send-button");
  const emojiButton = document.getElementById("emoji-button");
  const messageInput = document.getElementById("message");
  const messagesDiv = document.getElementById("messages");
  const imageInput = document.getElementById("image-input");

  let currentUser = "";
  let currentGroup = "";
  const groups = {}; // To store group messages

  // Sign In
  signInButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password.length <= 9) {
      currentUser = username;
      signInPage.style.display = "none";
      chatPage.style.display = "flex";
      usernameDisplay.textContent = `Hello, ${currentUser}`;
    } else {
      alert("Invalid username or password. Password must be up to 9 characters.");
    }
  });

  // Log Out
  logoutButton.addEventListener("click", () => {
    messagesDiv.innerHTML = "";
    messageInput.value = "";
    groupList.innerHTML = "";
    currentUser = "";
    currentGroup = "";

    signInPage.style.display = "flex";
    chatPage.style.display = "none";
    usernameInput.value = "";
    passwordInput.value = "";
  });

  // Create Group
  createGroupButton.addEventListener("click", () => {
    const groupName = prompt("Enter group name:");
    if (groupName) {
      const groupItem = document.createElement("li");
      groupItem.textContent = groupName;
      groupItem.addEventListener("click", () => {
        currentGroup = groupName;
        messagesDiv.innerHTML = `<h3>${groupName} Group Chat</h3>`;
        // Display existing messages for the group
        if (groups[currentGroup]) {
          groups[currentGroup].forEach((msg) => {
            const msgElement = document.createElement("div");
            msgElement.textContent = msg;
            msgElement.classList.add("message");
            messagesDiv.appendChild(msgElement);
          });
        }
      });
      groupList.appendChild(groupItem);
      groups[groupName] = []; // Initialize group messages
    }
  });

  // Send Message
  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message && currentGroup) {
      const msgElement = document.createElement("div");
      msgElement.textContent = message;
      msgElement.classList.add("message");
      messagesDiv.appendChild(msgElement);

      // Save message to the group
      if (!groups[currentGroup]) {
        groups[currentGroup] = [];
      }
      groups[currentGroup].push(message);

      messageInput.value = "";
    }
  });

  // Emoji Picker
  emojiButton.addEventListener("click", () => {
    const emojiPicker = document.createElement("div");
    emojiPicker.classList.add("emoji-picker");
    emojiPicker.style.position = "absolute";
    emojiPicker.style.bottom = "50px";
    emojiPicker.style.left = "10px";
    emojiPicker.style.display = "grid";
    emojiPicker.style.gridTemplateColumns = "repeat(3, 1fr)";
    emojiPicker.style.gap = "10px";
    emojiPicker.style.background = "#fff";
    emojiPicker.style.padding = "10px";
    emojiPicker.style.borderRadius = "5px";
    emojiPicker.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

    const emojis = ["😀", "😂", "😍", "😎", "😭", "😡", "🤔", "😜", "😊"];

    emojis.forEach((emoji) => {
      const emojiButton = document.createElement("button");
      emojiButton.innerText = emoji;
      emojiButton.classList.add("emoji-button");
      emojiButton.style.fontSize = "20px";
      emojiButton.style.padding = "10px";
      emojiButton.addEventListener("click", () => {
        messageInput.value += emoji;
        emojiPicker.remove();
      });
      emojiPicker.appendChild(emojiButton);
    });

    document.body.appendChild(emojiPicker);

    document.addEventListener("click", (e) => {
      if (!emojiPicker.contains(e.target) && e.target !== emojiButton) {
        emojiPicker.remove();
      }
    });
  });

  // Image Upload
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;
        imgElement.classList.add("image-preview");
        messagesDiv.appendChild(imgElement);

        // Save image to group messages
        if (currentGroup) {
          groups[currentGroup].push(`[Image: ${event.target.result}]`);
        }
      };
      reader.readAsDataURL(file);
    }
  });
});

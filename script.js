document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat");
    const openMenuButton = document.getElementById("open-menu-button");
    const closeMenuButton = document.getElementById("close-menu-button");
    const menuModal = document.getElementById("menu-modal");
    const aiDrawingButton = document.getElementById("ai-drawing-button");
    const runCodeButton = document.getElementById("run-code-button");
    const oldButton = document.getElementById("old");
    const setConfigButton = document.getElementById("set-config-button");
    const configModal = document.getElementById("config-modal");
    const configForm = document.getElementById("config-form");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const url = "https://uu.ci/v1/chat/completions/"; // Replace with your actual API URL
    const key = "sk-sL6Byr7cObkcIOmG7e3a75012877459f8b884bEc899fE03f"; // Replace with your actual API key
    const model = "gpt-3.5-turbo"; // Replace with your desired GPT model

    const messages = [];
    // 在页面加载完成后，选择要显示的模态框
    var jvanzhumodal = document.getElementById("jvanzhu");

    jvanzhumodal.style.display = "flex";
    sendButton.addEventListener("click", sendMessage);
    openMenuButton.addEventListener("click", openMenu);
    closeMenuButton.addEventListener("click", closeMenu);
    aiDrawingButton.addEventListener("click", navigateToAIDrawing);
    runCodeButton.addEventListener("click", navigateToRunCode);
    oldButton.addEventListener("click", navigateToold);
    setConfigButton.addEventListener("click", openConfigPopup); // Add this line
    closejvanzhu.addEventListener("click", closejvanzhuf);
    function closejvanzhuf() {
        jvanzhumodal.style.display = "none";
    }
    function openConfigPopup() {
        configModal.style.display = "flex";
    }

    configForm.addEventListener("submit", saveConfig);

    function saveConfig(event) {
        event.preventDefault();

        const apiKey = document.getElementById("api-key").url;
        const website = document.getElementById("website").key;
        const model = document.getElementById("model").model;
        const prompt = document.getElementById("prompt");

        // You can use these values to update your API calls or perform any other required actions

        configModal.style.display = "none";
    }
    function sendMessage() {
        const text = userInput.value.trim();
        if (text === "") return;

        addMessage("user", text);
        userInput.value = "";

        callAPI(text, "user");
    }
    function openMenu() {
        menuModal.style.display = "flex";
    }

    function closeMenu() {
        menuModal.style.display = "none";
    }

    function navigateToAIDrawing() {
        window.location.href = "menu/draw.html"; // Change to the correct path
    }

    function navigateToRunCode() {
        window.location.href = "https://cuteerratu.github.io/RunCode"; // Change to the correct URL
    }
     function navigateToold() {
        window.location.href = "./old/小兔ChatGPT API.html"; // Change to the correct URL
    }
    function callAPI(text, ps) {
        const message = { role: ps, content: text };
        messages.push(message);

        const data = {
            messages: messages,
            model: model
        };

        const headers = {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json"
        };

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(apiResponse => {
            if (apiResponse.choices && apiResponse.choices.length > 0) {
                const botMessage = apiResponse.choices[0].message.content;
                addMessage("bot", botMessage);
            }
        })
        .catch(error => {
            console.error("Error calling API:", error);
        });
    }

    function addMessage(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role);
    messageDiv.innerHTML = content; // Use innerHTML instead of textContent to render HTML

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

});

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const chatContainer = document.getElementById('chatContainer');
    const statusMessage = document.getElementById('statusMessage');
    const chatBox = document.getElementById('chatBox');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const textInput = document.getElementById('textInput'); // Get text input field
    sendButton.disabled = false;
    addStatusMessage('识别未开始');
    recognition.lang = 'zh-CN';
    let textMessage = ''; // Variable to store text messages
    recognition.onresult = function(event) {
    const result = event.results[0][0].transcript;
    speechText = result; // Store recognized speech
    textInput.value = result; // Append recognized speech to the input box
    textMessage = result; // Store recognized speech as the text message
    textInput.focus(); // Focus on the input box
    sendButton.disabled = false; // Enable Send button after speech recognition
};

    recognition.onerror = function(event) {
        addStatusMessage('发生错误：' + event.error);
    };

    recognition.onresult = function(event) {
    const result = event.results[0][0].transcript;
    speechText = result; // Store recognized speech
    textInput.value +=result; // Append recognized speech to the input box
    textMessage += result; // Append recognized speech to the text message
    textInput.focus(); // Focus on the input box
    sendButton.disabled = false; // Enable Send button after speech recognition
};

// ... Existing code ...

startButton.addEventListener('click', function() {
    recognition.start();
    addStatusMessage('请开始说话...');
    startButton.disabled = true;
    stopButton.disabled = false;
    sendButton.disabled = true; // Disable Send button during speech recognition
});

stopButton.addEventListener('click', function() {
    recognition.stop();
    addStatusMessage('识别已停止');
    startButton.disabled = false;
    stopButton.disabled = true;
    sendButton.disabled = false; // Enable Send button after speech recognition stops
});

sendButton.addEventListener('click', function() {
    const inputText = textInput.value.trim();
    
    if (inputText !== '') {
        textMessage +=inputText; // Append typed input to the text message
        addMessage('user', inputText); // Add the text message to the chat box
        sendToChatGPT(textMessage); // Send the combined message to ChatGPT
        textInput.value = ''; // Clear the input field
        textMessage = ''; // Clear the text message
        sendButton.disabled = false;
    }
});

    textInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const inputText = textInput.value.trim();
            if (inputText !== '') {
                addMessage('user', inputText);
                sendToChatGPT(inputText);
                textInput.value = ''; // Clear the input field
            }
        }
    });

    class ChatGPTAPI {
        constructor(model, key, url) {
                    this.model = model;
                    this.key = key;
                    this.url = url;
                    this.messages = [];
                }

                async callAPI(text, role) {
                    const message = { role, content: text };
                    this.messages.push(message);
                    const data = {
                        messages: this.messages,
                        model: this.model
                    };
                    const headers = {
                        Authorization: `Bearer ${this.key}`,
                        'Content-Type': 'application/json'
                    };

                    try {
                        const response = await fetch(this.url, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(data)
                        });

                        const apiResponse = await response.json();

                        if (apiResponse.choices && apiResponse.choices.length > 0) {
                            const choice = apiResponse.choices[0].message;
                            this.messages.push(choice);
                            return choice;
                        } else {
                            return apiResponse; // 处理错误情况
                        }
                    } catch (error) {
                        console.error('与ChatGPT通信时出错：', error);
                        return null;
                    }
                }


        show(role) {
            const content = this.messages
                .filter(message => message.role === role)
                .map(message => message.content);
            return content.length > 0 ? content[content.length - 1] : null;
        }
    }

    const DEFAULT_API_KEY = 'fk-nIYObrFcFoMgZOodN7OGlV7YFjQccLSEvYj9M_JT1e4';
    const API_ENDPOINT = 'https://ai.fakeopen.com/v1/chat/completions';
    const MODEL_NAME = 'gpt-3.5-turbo';

    const chatbot = new ChatGPTAPI(MODEL_NAME, DEFAULT_API_KEY, API_ENDPOINT);

    async function sendToChatGPT(text) {
        const response = await chatbot.callAPI(text, 'user');
        if (response && response.content) {
            addMessage('assistant', response.content);
        } else {
            addMessage('assistant', 'ChatGPT未提供回应。');
        }
    }

    function addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', role + '-message');
        messageDiv.textContent = content;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addStatusMessage(content) {
        statusMessage.textContent = content;
    }
} else {
    alert('抱歉，您的浏览器不支持Web Speech API。');
}

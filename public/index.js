const btn = document.getElementById("btn");
const chatArea = document.getElementById("chatarea");
const input = document.getElementById("input"); // Textarea element

// Add Enter key event listener
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) { // Only submit if Shift is not pressed
        event.preventDefault(); // Prevents newline in the textarea
        getResponse(); // Calls getResponse function
    }
});

btn.addEventListener('click', getResponse);

async function getResponse() {
    const inputText = input.value.trim(); // Fetches input value
    if (!inputText) {
        return;
    }

    const question = document.createElement("div");
    question.innerHTML = inputText;
    question.classList.add("box", "question");
    chatArea.appendChild(question);

    input.value = ""; // Clears input field

    try {
        let res = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                question: inputText
            })
        });

        const data = await res.json();

        if (data.message) {
            const answer = document.createElement('div');
            answer.innerHTML = data.message;
            answer.classList.add("box", "answer");
            chatArea.appendChild(answer);
        }
    } catch (error) {
        const errorMessage = document.createElement("div");
        errorMessage.innerHTML = "Error: " + (error.message.includes("429") ? 
            "API quota exceeded. Check your OpenAI plan and usage." : 
            "An error occurred.");
        errorMessage.classList.add("error");
        chatArea.appendChild(errorMessage);
    }
}

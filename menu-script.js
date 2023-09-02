document.addEventListener("DOMContentLoaded", function() {
    const aiDrawingButton = document.getElementById("ai-drawing-button");
    const runCodeButton = document.getElementById("run-code-button");

    aiDrawingButton.addEventListener("click", navigateToAIDrawing);
    runCodeButton.addEventListener("click", navigateToRunCode);

    function navigateToAIDrawing() {
        window.location.href = "menu/draw.html"; // Change to the correct path
    }

    function navigateToRunCode() {
        window.location.href = "https://cuteerratu.github.io/RunCode"; // Change to the correct URL
    }
});

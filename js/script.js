// Cache DOM elements once
const button = document.getElementById("advice-btn");
const heading = document.getElementById("advice-id");
const paragraph = document.getElementById("advice-text");

// Fetch advice from API
async function fetchAdvice() {
    try {
        const response = await fetch(
            `https://api.adviceslip.com/advice?timestamp=${Date.now()}`
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

// Update UI with new advice
async function displayAdvice() {
    button.classList.add("animate-spin");

    try {
        const data = await fetchAdvice();
        if (!data) throw new Error("No data received");

        heading.textContent = `Advice #${data.slip.id}`;
        paragraph.textContent = `"${data.slip.advice}"`;

    } catch (error) {
        console.error(error);
        paragraph.textContent = "Something went wrong. Try again.";
    } finally {
        button.classList.remove("animate-spin");
    }
}

// Load initial advice
displayAdvice();

// Button click handler
button.addEventListener("click", displayAdvice);

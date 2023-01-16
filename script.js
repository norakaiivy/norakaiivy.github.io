const enterBtn = document.getElementById("enter-btn");
const inputText = document.getElementById("input-text");
const responseDiv = document.getElementById("response");
const API_KEY = "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";

enterBtn.addEventListener("click", async () => {
    const text = inputText.value;
    // send request to OpenAI API to rewrite text
    const rewriteText = await rewriteEmail(text);
    // display response on webpage
    responseDiv.innerHTML = rewriteText;
});

async function rewriteEmail(text) {
    const prompt = "Rewrite this email, be more concise & direct, and warm but direct%: " + text + " from the text bot";
    const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ prompt: prompt, temperature: 0.6, max_tokens: 50})
    };
    const response = await fetch(apiUrl, options);
    const json = await response.json();
    return json.choices[0].text;
}

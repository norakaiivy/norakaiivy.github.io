const enterBtn = document.getElementById("enter-btn");
const inputText = document.getElementById("input-text");
const responseDiv = document.getElementById("response");
require('dotenv').config()



 // Use the API key stored in the environment variable
const apiKey = localStorage.getItem('API_KEY');


fetch('http://localhost:3000/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'User input text' })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });


enterBtn.addEventListener("click", async () => {
    const text = inputText.value;
    // send request to OpenAI API to rewrite text
    const rewriteText = await rewriteEmail(text);
    // display response on webpage
    responseDiv.innerHTML = rewriteText;
});

async function rewriteEmail(text) {
    const prompt = "Rewrite this email, be more concise & direct, and reduce word count by 25%: " + text + " from the text bot";
    const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ prompt: prompt, temperature: 0.6, max_tokens: 90})
    };
    try {
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (!json.choices[0] || !json.choices[0].text) {
        throw new Error("Invalid response");
      }
      return json.choices[0].text;
    } catch (e) {
      console.log(e);
      return "Chat GTP Is down. Try again soon!";
    }
}


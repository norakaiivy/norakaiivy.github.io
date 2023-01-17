const enterBtn = document.getElementById("enter-btn");
const inputText = document.getElementById("input-text");
const responseDiv = document.getElementById("response");
require('dotenv').config()

// Use the API key stored in the environment variable
const apiKey = process.env.API_KEY;

fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ 
        prompt: "Rewrite this email, be more concise & direct, and reduce word count by 25%: " + text + " from the text bot", 
        temperature: 0.6, 
        max_tokens: 90
    })
  })
  .then(response => response.json())
  .then(data => {
    if(!data.choices[0] || !data.choices[0].text) {
      throw new Error("Invalid response from API");
    }
    responseDiv.innerHTML = data.choices[0].text;
  })
  .catch(error => {
    console.log(error);
    responseDiv.innerHTML = "An error occurred, please try again later.";
  });

enterBtn.addEventListener("click", async () => {
    const text = inputText.value;
    rewriteEmail(text);
});

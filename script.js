// JavaScript for sending text to OpenAI API and displaying response
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
        const prompt = "Rewrite this email, be more concise & direct, and reduce word count by 25%: " + text + " from the text bot";
        const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
"Authorization": Bearer ${API_KEY}
},
body: JSON.stringify({
prompt: prompt,
temperature: 0.5,
max_tokens: 100
})
});
const json = await response.json();
return json.choices[0].text;
} catch (error) {
console.error(error);
}
}


const textInput = document.getElementById("text-input");
const enterButton = document.getElementById("enter-button");
const response = document.getElementById("response");

const API_KEY = "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";

enterButton.addEventListener("click", async () => {
  const text = textInput.value;
  const responseData = await postData("https://api.openai.com/v1/engines/davinci/completions", {
    prompt: `Rewrite the following email: ${text}`,
    api_key: API_KEY
  });
  const responseText = responseData.choices[0].text;
  response.innerHTML = responseText;
});

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

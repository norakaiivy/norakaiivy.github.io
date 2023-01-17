const enterBtn = document.getElementById("enter-btn");
const inputText = document.getElementById("input-text");
const responseDiv = document.getElementById("response");

enterBtn.addEventListener("click", async () => {
    const text = inputText.value;
    const data = { text: text };
    await fetch('/proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
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
});

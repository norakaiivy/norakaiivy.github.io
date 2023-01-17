const express = require('express');
const request = require('request'); // import request package
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.post('/proxy', (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      prompt: 'Rewrite this email, be more concise & direct, and reduce word count by 25%: ' + req.body.text + ' from the text bot', 
      temperature: 0.6, 
      max_tokens: 90
    })
  };
  request(options, function (error, response, body) {
    if (error) {
        res.status(500).send(error);
    } else {
        res.status(200).send(body);
    }
  });
});

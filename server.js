// Import the required modules using ES module syntax
import express from 'express';
import cors from 'cors';

// Create an Express application
const app = express();
const PORT = 8888;
app.use(express.json());
app.use(cors());

//APY and other variables
const API_KEY = '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';



app.get('/', (req, res) => {
  res.send('Welcome to your server'); // You can customize this response
});


app.post('/completions', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Enhance this text and make it better:" }, // System message to instruct translation
        { role: "user", content: req.body.message }
      ],
      max_tokens: 100,
    })
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai'); // Import OpenAI directly from the package
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
    const { messages, data } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                ...messages,
                { role: 'system', content: `You can query financial data such as Profit and Loss or Balance Sheet.` },
                { role: 'system', content: `Data: ${JSON.stringify(data)}` },
            ],
        });

        res.json(completion);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));

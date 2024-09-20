const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const OPENAI_API_KEY = 'your_openai_api_key'; // Replace with your actual OpenAI API key

app.use(express.json());
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;
    
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: prompt,
                n: 1,
                size: '1024x1024',
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        const imageUrl = response.data.data[0].url; // Get the image URL
        res.json({ imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

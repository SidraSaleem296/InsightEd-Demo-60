// const { OpenAI } = require('openai');

// // Replace 'your-api-key' with your actual API key
// const apiKey = process.env.OPENAI_API_KEY || 'your-api-key';

// if (!apiKey) {
//     console.error('API key is missing.');
//     process.exit(1);
// }

// const openai = new OpenAI(apiKey);

// async function fetchCompletion() {
//     try {
//         const response = await openai.completions.create({
//             model: "text-davinci-003",
//             prompt: "Translate the following English text to French: 'Hello, how are you?'",
//             max_tokens: 60
//         });
//         console.log(response.data.choices[0].text);
//     } catch (error) {
//         console.error('Error fetching completion:', error.message);
//     }
// }

// fetchCompletion();


const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure the API key is loaded correctly
});

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Hello, OpenAI!" }],
      model: "gpt-3.5-turbo",
    });
    console.log("OpenAI Response:", response);
  } catch (error) {
    console.error("Error connecting to OpenAI API:", error);
  }
}

testOpenAI();

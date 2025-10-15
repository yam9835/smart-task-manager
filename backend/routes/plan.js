const express = require("express");
const router = express.Router();
const { OpenAIApi, Configuration } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/generate", async (req, res) => {
  try {
    const goalText = req.body.goal;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: "You are a project planner." },
        { role: "user", content: `Break down this goal into tasks: ${goalText}` },
      ],
      max_tokens: 500,
    });

    const plan = completion.choices[0].message.content;
    res.json({ plan });

  } catch (error) {
    console.error("Error generating plan:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate plan" });
  }
});

module.exports = router;

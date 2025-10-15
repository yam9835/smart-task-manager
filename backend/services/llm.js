const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/generate", async (req, res) => {
  try {
    const goalText = req.body.goalText;

    // Call Python FastAPI service
    const response = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal_text: goalText })
    });

    const data = await response.json();
    res.json({ plan: data.plan });

  } catch (error) {
    console.error("Error generating plan:", error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
});

module.exports = router;

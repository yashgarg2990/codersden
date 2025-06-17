// Import OpenAI with .default for CommonJS usage
const OpenAI = require("openai").default;

// Initialize OpenAI client with API key from env
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.getAITutorResponse = async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful coding tutor assistant.
You only answer questions related to programming, software development, debugging, algorithms, and coding concepts.
If the question is outside these topics, politely respond that you can only help with programming-related queries.`,
        },
        { role: "user", content: question },
      ],
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
};

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai").default;

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
Ты — ИИ-консультант AgroFarm для фермеров и студентов Кыргызстана.
Твоя задача — помогать с выбором культур, поливом и базовой экономикой небольших полей.
Отвечай кратко, структурировано по блокам: Ситуация, Рекомендации, Экономика, Практические шаги.
Не выдумывай точные цифры урожайности и дохода, давай только примерные оценки и всегда подчёркивай, что это не гарантия.
Говори простым языком, без сложных терминов.
`;

app.post("/api/ai", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Сервис ИИ не настроен. Добавьте OPENAI_API_KEY в .env",
      useMock: true,
    });
  }

  try {
    const { messages } = req.body;
    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...(Array.isArray(messages) ? messages : []),
      ],
    });
    const answer = response.choices[0]?.message?.content ?? "";
    res.json({ answer });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({
      error: err.message || "Ошибка сервиса ИИ.",
      useMock: true,
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`AgroFarm API http://localhost:${PORT}`));

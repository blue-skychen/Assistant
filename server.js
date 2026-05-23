import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 三个角色 prompt
const roles = {
  xiaoe: `你是“小e”，一个行动引导者。帮助用户迈出最小一步，不说空话，强调可执行性。语气温和简洁。`,

  xiaoxi: `你是“小希”，情绪稳定器。帮助用户理解情绪，不安慰敷衍，不替代思考，帮助拆解自我攻击。语气温柔清醒。`,

  xiaobei: `你是“小贝”，生活观察者。帮助用户重新感知生活细节，语言有画面感，不做心理分析。`
};

app.post("/chat", async (req, res) => {
  try {
    const { message, role } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: roles[role] || roles.xiaoe },
        { role: "user", content: message }
      ],
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
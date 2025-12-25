import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un tutor personal experto y paciente en matemáticas, ciencias, idiomas, historia y más. Responde en español de forma clara, paso a paso, amigable y educativa. Usa ejemplos, corrige errores y pregunta para verificar comprensión.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_output_tokens: 500,
    });

    res.status(200).json({ result: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

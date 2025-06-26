import Groq from 'groq-sdk';
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY
});
export async function POST(request: Request) {
  try {
    const {
      productName,
      category,
      features,
      audience = '',
      tone,
      copyType
    } = await request.json();
    if (!productName || !category || !features || !tone || !copyType) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    const prompt = `
💡 You are a skilled marketing copywriter.

Generate **5 creative variations** of marketing content for the product below, tailored to the specified audience and tone of voice.

Each variation must include:
📝 A compelling **Product Description** (use relevant icons 💡, ✨, 🚀, etc., to make it engaging).
🧠 Three **Catchy Headlines**, each starting with an icon that matches the headline's content (e.g., "🚀 Boost Your Productivity").

---

🎯 **Product Details**:
- 🏷️ Name: ${productName}
- 🗂️ Category: ${category}
- ✨ Features: ${features.join(', ')}
  ${audience ? `- 👥 Target Audience: ${audience}` : ''}
- 🎭 Tone of Voice: ${tone}
- 📣 Copy Type: ${copyType}

---

📦 Please respond ONLY in the following **valid JSON array format**:

[
  {
    "description": "Write a description here...",
    "headlines": [
      "Headline 1",
      "Headline 2",
      "Headline 3"
    ]
  },
  {
    "description": "Another description...",
    "headlines": [
      "Headline 1",
      "Headline 2",
      "Headline 3"
    ]
  },
  ...
]

Return exactly **5 objects**, each with a description and 3 headlines. No commentary or extra text — JSON only.
`;

    const completion = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const rawOutput = completion.choices[0].message.content as string;

    try {
      const json = JSON.parse(rawOutput);
      return Response.json({ output: json });
    } catch (e) {
      console.error(' Failed to parse JSON from AI:', rawOutput);
      return Response.json({ error: 'AI returned invalid JSON format', raw: rawOutput }, { status: 500 });
    }
  } catch (err) {
    console.error(' Groq API Error:', err);
    return Response.json({ error: 'Groq API request failed' }, { status: 500 });
  }
}
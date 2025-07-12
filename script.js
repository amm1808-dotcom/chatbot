import express from 'express';
import cors from 'cors'
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = 4000;

// Inisialisasi middleware untuk parsing JSON
app.use(express.json());
app.use(cors({
    origin: '*'
}))

// Inisialisasi GoogleGenAI API
const ai = new GoogleGenAI({
  apiKey: "AIzaSyC0Z0ALZyg-0l41yplrIgR238XKEpxAvu8",  // Ganti dengan API Key kamu
});

// Route untuk menangani permintaan dari klien
app.post('/generate', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        thinkingConfig: {
          thinkingBudget: 100, // Pastikan thinking aktif
        },
      },
    });
    
    // Kirimkan hasil response dari API ke klien
    return res.json({ text: response.text });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'Error processing request' });
  }
});

// Menjalankan server Express
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

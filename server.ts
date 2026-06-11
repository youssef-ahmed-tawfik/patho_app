import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy-loaded Gemini Client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        throw new Error('GEMINI_API_KEY environment variable is not configured yet. Please configure it in the Secrets panel.');
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
    return aiClient;
  }

  // --- API ENDPOINTS ---

  // Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      apiKeyConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY')
    });
  });

  // Endpoint: AI Explainer & Mnemonic Generator
  app.post('/api/gemini/explain', async (req, res) => {
    try {
      const { question, answer } = req.body;
      if (!question || !answer) {
        return res.status(400).json({ error: 'Missing question or answer text.' });
      }

      const ai = getGeminiClient();
      const prompt = `
  You are an elite Veterinary Pathology & Clinical Hematology professor.
  Analyze the following flashcard's Question and Answer, then generate:
  1. **Simplified Breakdown**: A brief, easy-to-understand breakdown of the pathogenesis or medical mechanism behind it.
  2. **Clinical Importance**: Why this is crucial for a practicing veterinarian (e.g., diagnostic tips or implications).
  3. **Mnemonic Helper**: A creative, highly memorable mnemonic device (acronym, mental image, or funny rhyme) to remember this fact.

  Flashcard Question: "${question}"
  Flashcard Answer: "${answer}"

  Format the response using the following JSON schema. Do not include markdown code block syntax inside the properties themselves.
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              simplified: {
                type: Type.STRING,
                description: 'Clear, simplified explanation of the medical concept or pathogenesis.'
              },
              clinical: {
                type: Type.STRING,
                description: 'The real-world clinical veterinary significance and diagnostic value.'
              },
              mnemonic: {
                type: Type.STRING,
                description: 'A creative, memorable mnemonic device, acronym, or rhyme to help the student remember it.'
              }
            },
            required: ['simplified', 'clinical', 'mnemonic']
          }
        }
      });

      const result = response.text ? JSON.parse(response.text.trim()) : null;
      res.json({ success: true, explanation: result });
    } catch (error: any) {
      console.error('Explain error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate explanation.' });
    }
  });

  // Endpoint: Generate customized interactive quizzes
  app.post('/api/gemini/quiz', async (req, res) => {
    try {
      const { category, cardsContext } = req.body;
      if (!category) {
        return res.status(400).json({ error: 'Missing category.' });
      }

      const ai = getGeminiClient();
      const contextText = Array.isArray(cardsContext) 
        ? cardsContext.slice(0, 10).map((c: any) => `Q: ${c.question}\nA: ${c.answer}`).join('\n\n')
        : 'Review normal veterinary clinical pathology.';

      const prompt = `
  Generate a 4-question challenging multiple-choice practice quiz for veterinary students on the clinical subject: "${category}".

  Use the following reference cards context to make sure the questions are highly accurate and relevant to this specific curriculum:
  ${contextText}

  For each question:
  1. Create a clear, diagnostic or clinical-mechanism question.
  2. Provide exactly four realistic option strings.
  3. Choose the single absolute correct option string (the string must match one of the options exactly).
  4. Provide a supportive, highly educational explanation for why that option is correct.

  Format the response as a JSON array of QuizQuestion objects.
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'List of multiple choice quiz questions',
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ['id', 'question', 'options', 'correctAnswer', 'explanation']
            }
          }
        }
      });

      const result = response.text ? JSON.parse(response.text.trim()) : [];
      res.json({ success: true, quiz: result });
    } catch (error: any) {
      console.error('Quiz error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate quiz.' });
    }
  });

  // Endpoint: Generate a veterinary roleplay clinical case study
  app.post('/api/gemini/case-study', async (req, res) => {
    try {
      const { category } = req.body;
      if (!category) {
        return res.status(400).json({ error: 'Missing category.' });
      }

      const ai = getGeminiClient();
      const prompt = `
  Generate an immersive, real-world veterinary clinical case study for a veterinary pathology student covering: "${category}".

  The response must include:
  1. A descriptive clinical case title (e.g. "Case of the Ataxic Ewe", "The Pale Golden Retriever").
  2. An exciting scenario text describing a real-world patient presentation: species, age, clinical complaint, symptoms, and pertinent hematology/pathology parameters matching PDF findings.
  3. Exactly two multiple-choice diagnostic/pathological questions challenging the student to solve the case. Each question must have 4 options, a correct answer string matching one option exactly, and a thorough medical explanation.

  Ensure the case uses accurate veterinary knowledge from the curriculum (e.g., copper deficiency in sheep, Equine Infectious Anemia tongue petechiae, Babesiosis capillary plugging in brains, transudate vs exudate differences, etc.).
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              scenario: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ['question', 'options', 'correctAnswer', 'explanation']
                }
              }
            },
            required: ['id', 'title', 'scenario', 'questions']
          }
        }
      });

      const result = response.text ? JSON.parse(response.text.trim()) : null;
      res.json({ success: true, caseStudy: result });
    } catch (error: any) {
      console.error('Case study error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate case study.' });
    }
  });

  // Endpoint: Magic AI Flashcard Creator
  app.post('/api/gemini/generate-cards', async (req, res) => {
    try {
      const { text, category } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Missing notes text for card generation.' });
      }

      const ai = getGeminiClient();
      const prompt = `
  Extract key learning facts from the study notes provided below and convert them into three to five high-yield Question and Answer flashcards.
  The questions must be highly clear, specific, and focused. The answers should be educational and formatted cleanly.

  Study Notes:
  "${text}"

  Target Category: "${category || 'Custom Pathology'}"
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING },
                category: { type: Type.STRING }
              },
              required: ['question', 'answer', 'category']
            }
          }
        }
      });

      const result = response.text ? JSON.parse(response.text.trim()) : [];
      res.json({ success: true, cards: result });
    } catch (error: any) {
      console.error('Generate cards error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate custom flashcards.' });
    }
  });


  // --- INTEGRATE VITE FOR DEV / PRODUCTION SERVING ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start Server on PORT 3000 as mandatory
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();

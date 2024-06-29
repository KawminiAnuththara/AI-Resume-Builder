import { GoogleGenerativeAI } from "@google/generative-ai";

/* const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
   */
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
     export const AIChatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Job Title:Full Stack React Developer depends on job title give me summery for my resume within 4-5 lines"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "A passionate and skilled Full Stack React Developer with a proven track record of building high-performance, user-friendly web applications. Expertise in React.js, JavaScript, and various back-end technologies, including Node.js and Express.js. Proven ability to collaborate effectively within agile development environments, ensuring timely delivery of high-quality code.  Dedicated to continuous learning and keeping up with the latest web development trends. \n"},
          ],
        },
      ],
    });
  
    
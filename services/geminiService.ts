import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const analyzeMissionImage = async (
  base64Image: string,
  missionDescription: string
): Promise<AnalysisResult> => {
  try {
    const prompt = `
      You are the judge of a scavenger hunt game called "Lingua Hunter".
      The mission is: '${missionDescription}'.
      Look at the image provided carefully.

      If the image matches the mission description significantly, output status "success".
      If it does not match, output status "fail".

      Return a JSON object with:
      - status: "success" or "fail"
      - object_name: specific name of the main object in the image (in English)
      - vocab_en: the vocabulary word for the object (English)
      - vocab_th: the vocabulary word for the object (Thai translation)
      - comment: A short, fun, sci-fi style comment in Thai language (ภาษาไทย) explaining why it is correct or incorrect.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ["success", "fail"] },
            object_name: { type: Type.STRING },
            vocab_en: { type: Type.STRING },
            vocab_th: { type: Type.STRING },
            comment: { type: Type.STRING },
          },
          required: ["status", "object_name", "vocab_en", "vocab_th", "comment"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(text) as AnalysisResult;
    return result;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      status: "fail",
      object_name: "Unknown",
      vocab_en: "Error",
      vocab_th: "ข้อผิดพลาด",
      comment: "การสื่อสารกับยานแม่ล้มเหลว กรุณาลองใหม่อีกครั้ง",
    };
  }
};

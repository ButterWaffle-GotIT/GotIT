"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getChatResponse(message: string) {
	try {
		const model = genAI.getGenerativeModel({
			model: "gemini-2.5-flash",
			generationConfig: { responseMimeType: "application/json" },
		});

		const systemPrompt = `
      당신은 핵심만 짚어주는 IT 멘토입니다.
      사용자의 질문: "${message}"

      다음 규칙을 엄격히 준수하여 JSON으로 답변하세요:

      1. **답변 길이 제한 (중요):**
         - 스마트폰 화면에서도 한눈에 들어오도록 **짧고 간결하게** 작성하세요.
         - 장황한 서술형 설명은 금지합니다.

      2. **작성 전략:**
         - **CASE A (용어 정의):**
           1. **정의:** 1문장으로 명확하게 요약. [Image of ${message} architecture]
           2. (줄바꿈 2번)
           3. **핵심 특징:** 가장 중요한 특징 3가지만 골라 리스트(-)로 작성.
           4. (줄바꿈 2번)
           5. ### 🍎 쉬운 비유 (2문장 이내)
           6. (줄바꿈 2번)
           7. ### 💬 대화 예시 (A, B가 한 마디씩만 짧게)

         - **CASE B (나열/로드맵):**
           - 서론 없이 바로 **숫자 리스트(1.)**로 시작.
           - 각 단계는 **핵심만 1줄**로 설명.

      3. **JSON 출력:**
      {
        "answer": "Markdown 포맷의 답변",
        "recommendations": ["추천1", "추천2", "추천3"]
      }
    `;

		const result = await model.generateContent(systemPrompt);
		const response = await result.response;
		let text = response.text();

		text = text
			.replace(/```json/g, "")
			.replace(/```/g, "")
			.trim();
		const data = JSON.parse(text);

		return {
			success: true,
			answer: data.answer,
			recommendations: data.recommendations,
		};
	} catch (error) {
		console.error("Gemini API Error:", error);
		return {
			success: false,
			answer: "죄송합니다. 오류가 발생했어요.",
			recommendations: [],
		};
	}
}

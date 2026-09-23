
// import OpenAI from 'openai';
// import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const prompt = `
//       Create a list of three open-ended and engaging questions formatted as a single string.
//       Separate each question with '||'.
//       The questions should be suitable for an anonymous messaging application.
//       Do not number the questions.
//     `;

//     const response = await openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: [
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       max_tokens: 400,
//     });

//     const content = response.choices[0]?.message?.content;

//     if (!content) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'No suggestions generated',
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: content,
//     });
//   } catch (error: any) {
//     console.error("Error generating suggestions:", error);

//     if (error?.code === "credit_balance_exhausted") {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "You have no credits remaining. Please add credits to continue using the API.",
//         },
//         { status: 429 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to generate suggestions",
//       },
//       { status: 500 }
//     );
//   }
// }



// import { GoogleGenAI } from "@google/genai";
// import { NextResponse } from "next/server";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export const runtime = "nodejs";

// export async function POST() {
//   try {
//     const prompt = `
//       Create a list of three open-ended and engaging questions formatted as a single string.

//       Separate each question with '||'.

//       The questions should be suitable for an anonymous messaging application.

//       Do not number the questions.
//     `;

//     const response = await ai.models.generateContent({
//       model: "gemini-3.8-flash",
//       contents: prompt,
//     });

//     const content = response.text;

//     if (!content) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "No suggestions generated",
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: content,
//     });
//   } catch (error: any) {
//     console.error("Error generating suggestions:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || "Failed to generate suggestions",
//       },
//       { status: error?.status || 500 }
//     );
//   }
// }
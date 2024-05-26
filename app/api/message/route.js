import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req){
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "text": "You are talking to a human who is lonely. Try to cheer them up, but don't bring up the fact that they are lonely. Keep responses medium length.",
                "type": "text"
              }
            ]
          },
          {
            "role": "assistant",
            "content": [
              {
                "text": "Hey, what's up?",
                "type": "text"
              }
            ]
          },
            {
                "role": "user",
                "content": [
                {
                    "text": message,
                    "type": "text"
                }
                ]
            }
        ],
        temperature: 1,
        max_tokens: 128,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    //Test command: curl -X POST -H "Content-Type: application/json" -d '{"message": "I caught COVID"}' http://localhost:3000/api/message
    return NextResponse.json({ response: response.choices[0].message.content ?? "I'm sorry, I don't understand that." });
}
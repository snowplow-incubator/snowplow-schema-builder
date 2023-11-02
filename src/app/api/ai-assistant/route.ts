import { NextResponse } from "next/server";
import OpenAI from "openai";

// configuration
const baseURL = "https://api.endpoints.anyscale.com/v1";
const apiKey = process.env.OPENAI_API_KEY;
const model = "meta-llama/Llama-2-13b-chat-hf";

const openai = new OpenAI({ baseURL, apiKey });

function createPrompt(useCaseDescription: string, reports: string[]) {
  return `I want to design events and entities addressing the following use case: ${useCaseDescription}

Events are actions that the user does in the app. Event names should be written in camel case following a verb_noun structure, for example add_to_cart, or rate_app.

Entities are objects that are common across multiple events and add additional context. Entities should be written as a single word, for example user, or product.

I am interested in using them to create the following reports:
- ${reports.join("\n- ")}

Please reply with two valid JSON lists - one for events and one for entities. Each list should contain objects with "name", "description" and "properties" fields. The properties should be a list of objects with "name", "description" and "type" fields.`
}

export async function POST(req: Request) {
  const userInput = await req.json();
  const prompt = createPrompt(
    userInput.useCaseDescription,
    userInput.reports.map((r: any) => r.description)
  );
  console.log(prompt);

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model
  });
  console.log(chatCompletion);

  if (chatCompletion.choices.length === 0) {
    return NextResponse.json({ error: 'Failed to get suggestions from LLM' }, { status: 500 })
  }

  const choice = chatCompletion.choices[0];
  const content = choice.message.content;

  return NextResponse.json({
    content
  });
}

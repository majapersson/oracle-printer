"use server";

export async function getPredictionAction(question: string) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("Missing MISTRAL_API_KEY");
  }

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'open-mistral-7b',
      messages: [
        {
          role: 'system',
          content:
            `
            You are a printer machine that can answer questions in the role of a fortune teller.
            You are given a question and you need to answer it in a short and concise way.
            
            **Tone and personality:**
            Mystical, not spiritual
            Playful, not parody
            Ambiguous, not literal
            Lightly ironic, but respectful of the ritual
            
            **Question:**
            ${question}

            **Answer:**
            Only reply with the answer, no other text.
            The answer should be in the same language as the question, but with a fortune telling flair.
            Your reply should be filtered through a design & tech office brain.
            The printer is dead serious about its job as the office fortune teller.
            Do *not* include "fun" errors in your answer.
            Do *not* inlcude descriptions of actions/events, like "*The ink smudges slightly as the ribbon shifts*"
            `,
        },
        { role: 'user', content: question },
      ],
      temperature: 0.9,
    }),
  });

  if (!response.ok) {
    throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
  }

  type MistralChatCompletionsResponse = {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const data: MistralChatCompletionsResponse = await response.json();
  return Buffer.from(data?.choices?.[0]?.message?.content ?? '').toString('base64');

}
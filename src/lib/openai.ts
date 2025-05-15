import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export async function generateInsights(data: any) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a personal life assistant analyzing user data to provide insights."
        },
        {
          role: "user",
          content: JSON.stringify(data)
        }
      ]
    });

    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.error('Error generating insights:', error);
    throw error;
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Generate a quote using OpenAI
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate an inspiring quote about personal growth, health, or well-being. Keep it under 100 characters.",
      max_tokens: 100,
      temperature: 0.7,
    });

    const quote = completion.data.choices[0].text?.trim();

    if (!quote) {
      throw new Error('Failed to generate quote');
    }

    // Store the quote in the database
    const { error } = await supabase
      .from('ai_logs')
      .insert({
        user_id: req.headers['x-user-id'],
        prompt: 'Generate an inspiring quote',
        response: quote,
        type: 'quote',
      });

    if (error) {
      console.error('Error storing quote:', error);
    }

    return res.status(200).json({ quote });
  } catch (error) {
    console.error('Error generating quote:', error);
    return res.status(500).json({ message: 'Failed to generate quote' });
  }
} 
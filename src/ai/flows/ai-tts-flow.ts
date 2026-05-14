'use server';
/**
 * @fileOverview A flow that converts text to speech using Gemini's TTS model.
 *
 * - generateSpeech - A function that converts text to a WAV audio data URI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const TTSInputSchema = z.string().describe('The text to be converted to speech.');

export async function generateSpeech(text: string): Promise<{ audioUri: string }> {
  return generateSpeechFlow(text);
}

const generateSpeechFlow = ai.defineFlow(
  {
    name: 'generateSpeechFlow',
    inputSchema: TTSInputSchema,
    outputSchema: z.object({ audioUri: z.string() }),
  },
  async (text) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });

    if (!media || !media.url) {
      throw new Error('No media returned from TTS model');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavData = await toWav(audioBuffer);
    return {
      audioUri: 'data:audio/wav;base64,' + wavData,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
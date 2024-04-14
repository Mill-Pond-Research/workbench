import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({

  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // Backend Postgres, for optional storage via Prisma
    POSTGRES_PRISMA_URL: z.string().optional(),
    POSTGRES_URL_NON_POOLING: z.string().optional(),

    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),

    STRIPE_PUBLIC_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_SUBSCRIPTION_PRICE_ID: z.string(),
    URL: z.string().url(),

    // Backend MongoDB, for a more complete developer data platform.
    MDB_URI: z.string().optional(),

    // LLM: OpenAI
    OPENAI_API_KEY: z.string().optional(),
    OPENAI_API_HOST: z.string().url().optional(),
    OPENAI_API_ORG_ID: z.string().optional(),

    // LLM: Azure OpenAI
    AZURE_OPENAI_API_ENDPOINT: z.string().url().optional(),
    AZURE_OPENAI_API_KEY: z.string().optional(),

    // LLM: Anthropic
    ANTHROPIC_API_KEY: z.string().optional(),
    ANTHROPIC_API_HOST: z.string().url().optional(),

    // LLM: Google AI's Gemini
    GEMINI_API_KEY: z.string().optional(),

    // LLM: Groq
    GROQ_API_KEY: z.string().optional(),

    // LLM: LocalAI
    LOCALAI_API_HOST: z.string().url().optional(),
    LOCALAI_API_KEY: z.string().optional(),

    // LLM: Mistral
    MISTRAL_API_KEY: z.string().optional(),

    // LLM: Ollama
    OLLAMA_API_HOST: z.string().url().optional(),

    // LLM: OpenRouter
    OPENROUTER_API_KEY: z.string().optional(),

    // LLM: Perplexity
    PERPLEXITY_API_KEY: z.string().optional(),

    // LLM: Toghether AI
    TOGETHERAI_API_KEY: z.string().optional(),

    // Helicone - works on both OpenAI and Anthropic vendors
    HELICONE_API_KEY: z.string().optional(),

    // ElevenLabs - speech.ts
    ELEVENLABS_API_KEY: z.string().optional(),
    ELEVENLABS_API_HOST: z.string().url().optional(),
    ELEVENLABS_VOICE_ID: z.string().optional(),

    // Prodia
    PRODIA_API_KEY: z.string().optional(),

    // Google Custom Search
    GOOGLE_CLOUD_API_KEY: z.string().optional(),
    GOOGLE_CSE_ID: z.string().optional(),

    // Browsing Service
    PUPPETEER_WSS_ENDPOINT: z.string().url().optional(),

    // Backend: Analytics flags (e.g. which hostname responds) for managed installs
    BACKEND_ANALYTICS: z.string().optional().transform(list => (list || '').split(';').filter(flag => !!flag)),

    // Backend: HTTP Basic Authentication
    HTTP_BASIC_AUTH_USERNAME: z.string().optional(),
    HTTP_BASIC_AUTH_PASSWORD: z.string().optional(),

    // Build-time configuration
    BIG_AGI_BUILD: z.enum(['standalone', 'static']).optional(),

  },

  /*
   * Environment variables available on the client (and server).
   * You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   *
   * NOTE: they must be set at build time, not runtime(!)
   */
  client: {

    // Frontend: Google Analytics GA4 Measurement ID
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),

    // Frontend: server to use for PlantUML rendering
    NEXT_PUBLIC_PLANTUML_SERVER_URL: z.string().url().optional(),

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),

  },

  onValidationError: error => {
    console.error('❌ Invalid environment variables:', error.issues);
    throw new Error('Invalid environment variable');
  },

  // matches user expectations - see https://github.com/enricoros/big-AGI/issues/279
  emptyStringAsUndefined: true,

  // with Noext.JS >= 13.4.4 we'd only need to destructure client variables
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    NEXT_PUBLIC_PLANTUML_SERVER_URL: process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_SUBSCRIPTION_PRICE_ID: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
    URL: process.env.URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    MDB_URI: process.env.MDB_URI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_API_HOST: process.env.OPENAI_API_HOST,
    OPENAI_API_ORG_ID: process.env.OPENAI_API_ORG_ID,
    AZURE_OPENAI_API_ENDPOINT: process.env.AZURE_OPENAI_API_ENDPOINT,
    AZURE_OPENAI_API_KEY: process.env.AZURE_OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    ANTHROPIC_API_HOST: process.env.ANTHROPIC_API_HOST,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    LOCALAI_API_HOST: process.env.LOCALAI_API_HOST,
    LOCALAI_API_KEY: process.env.LOCALAI_API_KEY,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
    OLLAMA_API_HOST: process.env.OLLAMA_API_HOST,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    TOGETHERAI_API_KEY: process.env.TOGETHERAI_API_KEY,
    HELICONE_API_KEY: process.env.HELICONE_API_KEY,
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
    ELEVENLABS_API_HOST: process.env.ELEVENLABS_API_HOST,
    ELEVENLABS_VOICE_ID: process.env.ELEVENLABS_VOICE_ID,
    PRODIA_API_KEY: process.env.PRODIA_API_KEY,
    GOOGLE_CLOUD_API_KEY: process.env.GOOGLE_CLOUD_API_KEY,
    GOOGLE_CSE_ID: process.env.GOOGLE_CSE_ID,
    PUPPETEER_WSS_ENDPOINT: process.env.PUPPETEER_WSS_ENDPOINT,
    BACKEND_ANALYTICS: process.env.BACKEND_ANALYTICS,
    HTTP_BASIC_AUTH_USERNAME: process.env.HTTP_BASIC_AUTH_USERNAME,
    HTTP_BASIC_AUTH_PASSWORD: process.env.HTTP_BASIC_AUTH_PASSWORD,
    BIG_AGI_BUILD: process.env.BIG_AGI_BUILD,
  },
});

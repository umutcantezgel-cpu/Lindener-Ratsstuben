import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_CALENDLY_URL: z.string().url('Valid Calendly URL required').optional(),
});

// Runtime validation
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/',
};

// Safe parse to prevent hard crashes in local dev but still warn
const parsedEnv = envSchema.safeParse(processEnv);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment variables'); // Fail build in prod
  }
}

export const env = parsedEnv.success ? parsedEnv.data : processEnv;

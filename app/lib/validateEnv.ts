import z from 'zod';

const envSchema = z.object({
    API_URL: z.string().url(),
    API_CONTENT_TYPE: z.string(),
    X: z.coerce.number(),
    Y: z.coerce.number(),
    PING_URL: z.string(),
    PING_PACKETS: z.coerce.number().min(1).max(8),
  });

const env = envSchema.parse(process.env);

export default env; 
  
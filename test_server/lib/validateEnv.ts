import z from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(7357),
  });

const env = envSchema.parse(process.env);

export default env; 
  
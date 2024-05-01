import {z} from 'zod';

export const ApiGetSchema = z.object({
    gS: z.string().min(1),
    aS: z.string().min(1),
    ahS: z.string().min(1), 
    iaS: z.string().min(1),
    nS: z.string().min(1),
    lS: z.string().min(1),
});

export type ApiGet = z.infer<typeof ApiGetSchema>;
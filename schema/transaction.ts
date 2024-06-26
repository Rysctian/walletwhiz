import { z } from "zod"

export const CreateTransactionSchema = z.object({
    amount: z.coerce.number().positive().multipleOf(0.01),
    description: z.string().optional(),
    date: z.coerce.date(),
    category: z.string(),
    type: z.union([
        z.literal("expense"),
        z.literal("income")
    ])
});


export type CreateTrasactionSchemaType = z.infer<typeof CreateTransactionSchema>;
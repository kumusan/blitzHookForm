import * as z from "zod"

export const CreateInput = z.object({
  title: z.string(),
  content: z.string(),
})
export type CreateInputType = z.infer<typeof CreateInput>

export const UpdateInput = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
})
export type UpdateInputType = z.infer<typeof UpdateInput>

import { z } from "zod";
import { insertQuizSubmissionSchema, quizSubmissions } from "./schema";

export const api = {
  submissions: {
    create: {
      method: "POST" as const,
      path: "/api/submissions",
      input: insertQuizSubmissionSchema,
      responses: {
        201: z.custom<typeof quizSubmissions.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    list: {
      method: "GET" as const,
      path: "/api/submissions",
      responses: {
        200: z.array(z.custom<typeof quizSubmissions.$inferSelect>()),
      },
    },
  },
};

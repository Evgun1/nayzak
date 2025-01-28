import { Record } from "@prisma/client/runtime/library";
import { HTTPException } from "hono/http-exception";
import { ZodIssue } from "zod";

type FromValidatorProps = {};

const schemaValidationHandler = async (
  value: Record<string, any | File>,
  schema: Map<any, any>,
) => {
  const allResults = new Map();

  for (const key in value) {
    if (!schema.has(key)) {
      continue;
    }

    const zodValidator = schema.get(key);
    const result = zodValidator?.safeParse(value[key]);

    if (result?.success) {
      continue;
    }

    const error = result?.error?.issues
      .map((objectData: ZodIssue, index: number) => objectData.message)
      .join(" ");

    allResults.set(key, error);
  }

  if (allResults.size > 0) {
    const message: string[] = [];
    allResults.forEach((objectData, key) =>
      message.push(`Problem with ${key}. ${objectData}.`),
    );

    throw new HTTPException(401, { message: message.join(" ") });
  }
};
export default schemaValidationHandler;

import { Record } from "@prisma/client/runtime/library";
import { HTTPException } from "hono/http-exception";
import { email, password } from "../../utils/validator";

const UserFromValidator = async (value: Record<string, string | File>) => {
  const schema = new Map([
    ["email", email],
    ["password", password],
  ]);

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
      .map((value, index) => value.message)
      .join(" ");

    allResults.set(key, error);
  }

  if (allResults.size > 0) {
    const message: string[] = [];
    allResults.forEach((value, key) =>
      message.push(`Problem with ${key}. ${value}.`)
    );

    throw new HTTPException(401, { message: message.join(" ") });
  }
};
export default UserFromValidator;

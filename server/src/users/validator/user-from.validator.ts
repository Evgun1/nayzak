import { Record } from "@prisma/client/runtime/library";
import { log } from "console";
import { Context, ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import { ValidationFunction } from "hono/validator";
import { InputType } from "zlib";
import { z } from "zod";
import { email, password } from "../../utils/validator";

const UserFromValidator = async (
  value: Record<string, string | File>,
  c: Context
) => {
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

    console.log(result?.error);

    if (result?.success) {
      continue;
    }

    allResults.set(key, result);
  }

  // console.log(messages);

  throw new HTTPException(401, { message: "Incorrect password" });
};
export default UserFromValidator;

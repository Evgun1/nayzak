import { z } from "zod";

export const email = z.string().email();

export const password = z
  .string()
  // .min(3)
  .refine((val) => val.length >= 3, {
    message: "Password less than three words",
  })
  .refine((val) => !val.trim().includes(" "), {
    message: "Password should not include blank space",
  })
  .refine((val) => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val), {
    message:
      "Password should include one of next symbols: !@#$%^&*()_+-=[]{};':\"\\|,.<>/?~",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain one capital letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password should include one of next numbers: 0-9",
  });

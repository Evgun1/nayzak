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

export const firstName = z
  .string()
  .refine((val) => val.length >= 3, {
    message: "First name less than three words",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "First name must contain one capital letter",
  })
  .refine(
    (val) =>
      (val.match(/[.\-_]/) || []).length >= 1 && !/[^a-zA-Z.\-_]/.test(val),
    { message: "First name can have one symbols: .-_ " }
  )
  .refine((val) => /^[.\-_]/.test(val) || /[.\-_]$/.test(val), {
    message:
      "First name cannot contain symbols: .-!()_ at the beginning or end of a line",
  });

export const lastName = z
  .string()
  .refine((val) => val.length >= 3, {
    message: "Last name less than three words",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Last name must contain one capital letter",
  })
  .refine(
    (val) =>
      (val.match(/[.\-_]/) || []).length >= 1 && !/[^a-zA-Z.\-_]/.test(val),
    { message: "Last name can have one symbols: .-_ " }
  )
  .refine((val) => /^[.\-_]/.test(val) || /[.\-_]$/.test(val), {
    message:
      "Last name cannot contain symbols: .-!()_ at the beginning or end of a line",
  });

export const displayName = z
  .string()
  .refine((val) => val.length >= 3, {
    message: "Display name less than three words",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Display name must contain one capital letter",
  })
  .refine(
    (val) =>
      (val.match(/[.\-!()_]/) || []).length >= 1 &&
      !/[^a-zA-Z.\-!()_]/.test(val),
    { message: "Display name can have one symbols: .-!()_ " }
  )
  .refine((val) => /^[.\-!()_]/.test(val) || /[.\-!()_]$/.test(val), {
    message:
      "Display name cannot contain symbols: .-!()_ at the beginning or end of a line",
  })
  .refine((val) => !val.trim().includes(" "), {
    message: "Display name should not include blank space",
  });

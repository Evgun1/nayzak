import { z } from "zod";

const number = z.coerce.string().refine(
  (val) => {
    const num = Number(val);
    return !isNaN(num) && num > 0;
  },
  {
    message: "The value must be a positive number",
  },
);

const name = z
  .string()
  .refine((val) => val.length >= 3, {
    message: "Display name less than three words",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Display name must contain one capital letter",
  })
  .refine((val) => (val.match(/[.\-_]/g) || []).length <= 1, {
    message: "Display name can have one symbols: .-_ ",
  })
  .refine(
    (val) =>
      !/^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val) ||
      !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]$/.test(val),
    {
      message:
        "Display name cannot contain symbols: .-!()_ at the beginning or end of a line",
    },
  )
  .refine((val) => !/[`!@#$%^&*()+=\[\]{};':"\\|,<>\/?~]/.test(val), {
    message: "Should not have symbols: !@#$%^&*()+=[]{};':\"\\|,<>/?~",
  })
  .refine((val) => !val.trim().includes(" "), {
    message: "Display name should not include blank space",
  });

const global = {
  number,
  name,
};

export default global;

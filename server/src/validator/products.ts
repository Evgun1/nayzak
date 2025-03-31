import { z } from "zod";

const title = z
  .string()
  .refine((val) => val.length >= 10, {
    message: "Title less than ten words",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Title must contain one capital letter",
  })
  .refine((val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]$/.test(val), {
    message:
      "Title cannot contain symbols: .-() at the beginning or end of a line",
  })
  .refine((val) => !/^[^`!@#$%^&*_+=\[\]{};':"\\|,<>\/?~]*$/.test(val), {
    message: "Should not have symbols: !@#$%^&*_+=\\[\\]{};':\"\\\\|,<>\\/?~",
  });

const description = z
  .string()
  .refine((val) => val.length >= 20, {
    message: "Title less than twenty words",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Title must contain one capital letter",
  })
  .refine((val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]$/.test(val), {
    message:
      "Title cannot contain symbols: () at the beginning or end of a line",
  })
  .refine((val) => !/^[^`!@#$%^&*_()+=\[\]{};':"\\|,<>\/?~]*$/.test(val), {
    message: "Should not have symbols: !@#$%^&*()_+=[]{};':|,<>/?~",
  });

const status = z
  .string()
  .refine((val) => ["in stock", "out of stock", "disable"].includes(val), {
    message: 'Must be "in stock", "out of stock", "disable"',
  });

const product = {
  title,
  description,
  status,
};

export default product;

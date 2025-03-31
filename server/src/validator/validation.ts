import { z } from "zod";
import global from "./global";
import product from "./products";

/**
 * TODO
 *
 *Split module validators. Look at global and products examples
 *
 */

export default function validation() {
  return {
    global,
    product,
    categories: {
      title: z
        .string()
        .refine((val) => val.length >= 10, {
          message: "Title less than ten words",
        })
        .refine((val) => /[A-Z]/.test(val), {
          message: "Title must contain one capital letter",
        })
        .refine(
          (val) => {
            console.log(val.includes(`/[0-9]/`));
            return !val.trim().includes(`/[0-9]/`);
          },
          {
            message: "Title cannot contain numbers",
          },
        )
        .refine((val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]/.test(val), {
          message: "Title cannot contain special symbols",
        }),
    },

    subcategories: {
      title: z
        .string()
        .refine((val) => val.length >= 10, {
          message: "Title less than ten words",
        })
        .refine((val) => /[A-Z]/.test(val), {
          message: "Title must contain one capital letter",
        })
        .refine((val) => val.trim().includes(`/[0-9]/`), {
          message: "Title cannot contain numbers",
        })
        .refine((val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]/.test(val), {
          message: "Title cannot contain special symbols",
        }),
      categoriesId: z.coerce.string().refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num > 0;
        },
        {
          message: "The value must be a positive number",
        },
      ),
    },

    auth: {
      email: z.string().email(),
      password: z
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
        }),
    },

    addresses: {
      city: z.string().refine((val) => val.length >= 5, {
        message: "City less than five words",
      }),

      street: z.string().refine((val) => val.length >= 5, {
        message: "City less than five words",
      }),

      postalCode: z.coerce
        .string()
        .refine(
          (val) => {
            const num = Number(val);
            return !isNaN(num) && num > 0;
          },
          {
            message: "The value must be a positive number",
          },
        )
        .refine((val) => val.length >= 6, {
          message: "Postal Code less than six words",
        }),

      customersId: z.coerce
        .string()
        .refine(
          (val) => {
            const num = Number(val);
            return !isNaN(num) && num > 0;
          },
          {
            message: "The value must be a positive number",
          },
        )
        .optional(),
    },

    queryParams: {},
  };
}

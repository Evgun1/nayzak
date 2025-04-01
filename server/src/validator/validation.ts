import { z } from "zod";

export default function validation() {
    return {
        global: {
            number: z.coerce.string().refine(
                (val) => {
                    const num = Number(val);
                    return !isNaN(num) && num > 0;
                },
                {
                    message: "The value must be a positive number",
                }
            ),

            name: z
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
                    }
                )
                .refine(
                    (val) => !/[`!@#$%^&*()+=\[\]{};':"\\|,<>\/?~]/.test(val),
                    {
                        message:
                            "Should not have symbols: !@#$%^&*()+=[]{};':\"\\|,<>/?~",
                    }
                )
                .refine((val) => !val.trim().includes(" "), {
                    message: "Display name should not include blank space",
                }),
        },

        product: {
            title: z
                .string()
                .refine((val) => val.length >= 10, {
                    message: "Title less than ten words",
                })
                .refine((val) => /[A-Z]/.test(val), {
                    message: "Title must contain one capital letter",
                })
                .refine(
                    (val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]$/.test(val),
                    {
                        message:
                            "Title cannot contain symbols: .-() at the beginning or end of a line",
                    }
                )
                .refine(
                    (val) => /^[^`!@#$%^&*_+=\[\]{};':"\\|,<>\/?~]*$/.test(val),
                    {
                        message:
                            "Should not have symbols: !@#$%^&*_+=\\[\\]{};':\"\\\\|,<>\\/?~",
                    }
                ),

            description: z
                .string()
                .refine((val) => val.length >= 20, {
                    message: "Description less than twenty words",
                })
                .refine((val) => /[A-Z]/.test(val), {
                    message: "Description must contain one capital letter",
                })
                .refine(
                    (val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]$/.test(val),
                    {
                        message:
                            "Description cannot contain symbols: () at the beginning or end of a line",
                    }
                )
                .refine(
                    (val) =>
                        /^[^`!@#$%^&*_()+=\[\]{};':"\\|,<>\/?~]*$/.test(val),
                    {
                        message:
                            "Should not have symbols: !@#$%^&*()_+=[]{};':|,<>/?~",
                    }
                ),

            status: z.string().refine(
                (val) => {
                    return ["outOfStock", "inStock", "discontinued"].includes(
                        val
                    );
                },
                {
                    message: 'Must be "in stock", "out of stock", "disable"',
                }
            ),
        },

        categories: {
            title: z
                .string()
                .refine((val) => val.length >= 10, {
                    message: "Title less than ten words",
                })
                .refine((val) => /[A-Z]/.test(val), {
                    message: "Title must contain one capital letter",
                })
                // .refine((val) => !val.trim().includes(`/[0-9]/`), {
                //     message: "Title cannot contain numbers",
                // })
                .refine(
                    (val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]/.test(val),
                    {
                        message: "Title cannot contain special symbols",
                    }
                ),
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
                .refine(
                    (val) => !/[`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]/.test(val),
                    {
                        message: "Title cannot contain special symbols",
                    }
                ),
            categoriesId: z.coerce.string().refine(
                (val) => {
                    const num = Number(val);
                    return !isNaN(num) && num > 0;
                },
                {
                    message: "The value must be a positive number",
                }
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
                .refine(
                    (val) =>
                        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val),
                    {
                        message:
                            "Password should include one of next symbols: !@#$%^&*()_+-=[]{};':\"\\|,.<>/?~",
                    }
                )
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
                    }
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
                    }
                )
                .optional(),
        },

        queryParams: {},
    };
}

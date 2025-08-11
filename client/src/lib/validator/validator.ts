import { z } from "zod";

export const schemeEmail = z.string().trim().email();

export const schemePassword = z
	.string()
	.min(3, { message: "Password less than three words" })
	// .refine((val) => val.length >= 3, {
	//   message: "Password less than three words",
	// })
	.refine((val) => !val.trim().includes(" "), {
		message: "Password should not include blank space",
	})
	.refine((val) => /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val), {
		message:
			"Password should include one of next symbols: !@#$%^&*()_+-=[]{};':\"\\|,.<>/?~",
	})
	.refine((val) => /[A-Z]/.test(val), {
		message: "Password must contain one capital letter",
	})
	.refine((val) => /[0-9]/.test(val), {
		message: "Password should include one of next numbers: 0-9",
	});

export const schemaName = z
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
			!/^[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(val) ||
			!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]$/.test(val),
		{
			message:
				"Display name cannot contain symbols: -!()_ at the beginning or end of a line",
		},
	)
	.refine((val) => !/[`!@#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/.test(val), {
		message: "Should not have symbols: !@#$%^&*()+=[]{};':\"\\|,<>/?~",
	})
	.refine((val) => !val.trim().includes(" "), {
		message: "Display name should not include blank space",
	});

export const validation = {
	auth: {
		login: {
			email: z
				.string()
				.refine((val) => val, {
					message: "Email is required",
				})
				.refine((val) => val.trim().includes("@"), {
					message: "Invalid email",
				}),
			password: z.string().refine((val) => val, {
				message: "Password is required",
			}),
		},
		register: {
			email: z.string().trim().email(),
			password: schemePassword,
			firstName: schemaName,
			lastName: schemaName,
		},
	},

	changePassword: {
		password: z
			.string()
			.refine((val) => val, { message: "The field must not be empty" }),
		newPassword: schemePassword,
		confirmPassword: z
			.string()
			.refine((val) => val, { message: "The field must not be empty" }),
	},

	customer: {
		firstName: schemaName,
		lastName: schemaName,
		phone: z.coerce
			.string()
			.refine((val) => val.length >= 9, {
				message: "Phone less than six characters",
			})
			.refine((val) => val.length <= 20, {
				message: "Postal code is more than twenty characters",
			}),
	},

	addresses: {
		city: z.string().refine((val) => val.length >= 5, {
			message: "City less than five words",
		}),

		street: z.string().refine((val) => val.length >= 5, {
			message: "Street less than five words",
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
				message: "Postal Code less than six characters",
			}),
	},

	writeReview: {
		rating: z.coerce
			.string()
			.refine((val) => +val > 0, {
				message: "You need to specify a rating",
			}),
		review: z
			.string()
			.refine((val) => val.length > 1, {
				message: "The field should not be empty",
			})
			.refine((val) => !/[`@#$%^&*()_+\=\[\]{}|<>\/~]/.test(val), {
				message:
					"The review must not contain the following characters: @#$%^&*()_+=[]{}|<>/~",
			}),
	},
};

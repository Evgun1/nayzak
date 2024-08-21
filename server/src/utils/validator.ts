import { z } from "zod";

export const email = z.string().email();
export const password = z.string().min(3);
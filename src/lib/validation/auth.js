import { string, object, minLength, maxLength, email as emailValidator, transform, pipe } from "valibot";

export const signupSchema = object({
  name: string([minLength(2, "Name must be at least 2 characters"), maxLength(80, "Name must be at most 80 characters")]),
  email: pipe(
    string([emailValidator("Invalid email address")]),
    transform((value) => value.toLowerCase())
  ),
  password: string([minLength(8, "Password must be at least 8 characters"), maxLength(100)]),
});

export const loginSchema = object({
  email: pipe(
    string([emailValidator("Invalid email address")]),
    transform((value) => value.toLowerCase())
  ),
  password: string([minLength(1, "Password required"), maxLength(100)]),
});

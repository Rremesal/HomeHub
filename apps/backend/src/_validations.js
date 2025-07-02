import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().max(50),
  password: yup.string().min(6).max(30).required(),
});
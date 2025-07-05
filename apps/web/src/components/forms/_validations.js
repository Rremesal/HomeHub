import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().max(50).required(),
  password: yup.string().min(6).max(30).required(),
});

export const createUserValidation = yup.object({
  first_name: yup.string().max(50).required(),
  last_name: yup.string().max(50).required(),
  email: yup.string().email().max(50).required(),
});
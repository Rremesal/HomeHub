import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().required().max(60),
  password: yup.string().required().min(6).max(60)
});

export const createUserValidation = yup.object({
  firstName: yup.string().required().max(50),
  lastName: yup.string().required().max(50),
  email: yup.string().required().email().max(60),
});

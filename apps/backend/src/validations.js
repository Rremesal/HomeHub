import yup from "yup";
import { PRIORITIES } from "./constants.js";

export const registerValidation = yup.object({
  firstName: yup.string().required().max(50),
  lastName: yup.string().required().max(50),
  email: yup.string().email().required().max(50),
});

export const loginValidation = yup.object({
  email: yup.string().email().required().max(50),
  password: yup.string().required().min(6).max(50),
});

export const createTicketValidation = yup.object({
  title: yup.string().required().max(40),
  description: yup.string().max(500),
  priority: yup.string().oneOf(Object.keys(PRIORITIES))
});


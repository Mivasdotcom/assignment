import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  role: Joi.string().valid("user", "admin"),
  password: Joi.string().min(6),
});
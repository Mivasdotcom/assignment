import Joi from "joi";

export const createStreamingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  thumbnailUrl: Joi.string().uri().required(),
  videoUrl: Joi.string().uri().required(),
});

export const updateStreamingSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  thumbnailUrl: Joi.string().uri(),
  videoUrl: Joi.string().uri(),
});

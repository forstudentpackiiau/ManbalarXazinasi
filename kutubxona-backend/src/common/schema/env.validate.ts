import * as Joi from "joi";

export const serverSchema = Joi.alternatives().try(
  // Option 1: DATABASE_URL is provided (Render)
  Joi.object({
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().uri().required(),
    KUTUBXONACHI_LOGINI: Joi.string().required(),
    KUTUBXONACHI_PAROLI: Joi.string().required(),
    USTOZ_LOGINI: Joi.string().required(),
    USTOZ_PAROLI: Joi.string().required(),
  }),

  // Option 2: Individual DB fields are provided (local dev)
  Joi.object({
    PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    KUTUBXONACHI_LOGINI: Joi.string().required(),
    KUTUBXONACHI_PAROLI: Joi.string().required(),
    USTOZ_LOGINI: Joi.string().required(),
    USTOZ_PAROLI: Joi.string().required(),
  })
);

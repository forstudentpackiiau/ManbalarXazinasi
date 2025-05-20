import * as Joi from "joi";

export const serverSchema = Joi.object({
  PORT: Joi.number().required(),

  DATABASE_URL: Joi.string().uri().optional(),

  POSTGRES_USER: Joi.when('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  POSTGRES_DB: Joi.when('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  POSTGRES_HOST: Joi.when('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  POSTGRES_PASSWORD: Joi.when('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  POSTGRES_PORT: Joi.when('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.number().required(),
  }),

  KUTUBXONACHI_LOGINI: Joi.string().required(),
  KUTUBXONACHI_PAROLI: Joi.string().required(),
  USTOZ_LOGINI: Joi.string().required(),
  USTOZ_PAROLI: Joi.string().required(),
});

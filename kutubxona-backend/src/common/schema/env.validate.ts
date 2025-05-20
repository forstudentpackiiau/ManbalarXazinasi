import * as Joi from "joi";

export const serverSchema = Joi.object({
  PORT: Joi.number().required(),

  // Allow either DATABASE_URL or individual fields
  DATABASE_URL: Joi.string().uri().optional(),

  POSTGRES_USER: Joi.alternatives().conditional('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required()
  }),
  POSTGRES_DB: Joi.alternatives().conditional('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required()
  }),
  POSTGRES_HOST: Joi.alternatives().conditional('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required()
  }),
  POSTGRES_PASSWORD: Joi.alternatives().conditional('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().required()
  }),
  POSTGRES_PORT: Joi.alternatives().conditional('DATABASE_URL', {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.number().required()
  }),

  KUTUBXONACHI_LOGINI: Joi.string().required(),
  KUTUBXONACHI_PAROLI: Joi.string().required(),
  USTOZ_LOGINI: Joi.string().required(),
  USTOZ_PAROLI: Joi.string().required(),
});

import Joi from 'joi/lib';
import User from './user.model';

const UserCreateSchema = Joi.object<User>({
  name: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.empty': 'Le champ Nom est obligatoire',
      'string.required': 'Le champ Nom est obligatoire',
      'string.min': 'Le champ nom doit avoir 2 characteres minimum',
    }),
  username: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': 'validation.min|{#limit}',
      'string.required': 'validation.required',
      'string.empty': 'validation.empty',
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'string.pattern': 'validation.password',
      'string.required': 'validation.required',
      'string.empty': 'validation.empty',
    }),
});

export default {
  UserCreate: UserCreateSchema,
};

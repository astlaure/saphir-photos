import Joi, { ObjectSchema } from 'joi/lib';
import { ValidationException, ValidationResponse } from '../errors/validation.exception';

const Validator = async <T>(schema: ObjectSchema<T>, data: any) => {
  try {
    return await schema.validateAsync(data, { abortEarly: false, stripUnknown: true });
  } catch (err) {
    const errors = err as Joi.ValidationError;
    const validation: ValidationResponse = { messages: {}, originals: {} };

    validation.originals = errors._original;
    errors.details.map((error) => {
      validation.messages[error.context?.key!] = error.message;
    })

    throw new ValidationException(validation);
  }
}

export default Validator;

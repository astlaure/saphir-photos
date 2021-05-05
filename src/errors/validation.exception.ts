export interface ValidationResponse {
  messages: { [key: string]: string };
  originals: { [key: string]: any };
}

export class ValidationException extends Error {
  validations: ValidationResponse;
  constructor(validations: ValidationResponse) {
    super("Validation Error");
    this.validations = validations;
  }
}

import { ValidationError } from "class-validator";

export class AppError {
  constructor(public message: string, public code: number) {}
}

export class AppValidationError {
  public code: number = 400;
  constructor(public errors: ValidationError[]) {}
}

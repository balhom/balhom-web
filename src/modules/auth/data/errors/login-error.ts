import { AppError } from "../../../../common/data/errors/app-error";

export class LoginError extends AppError {
  type: LoginErrorTypeEnum;

  constructor(type: LoginErrorTypeEnum) {
    super("");
    this.type = type;
  }

  static credentialsError(): LoginError {
    return new LoginError(LoginErrorTypeEnum.CREDENTIALS_ERROR);
  }

  static emailNotVerifiedError(): LoginError {
    return new LoginError(LoginErrorTypeEnum.EMAIL_NOT_VERIFIED_ERROR);
  }

  static unknownError(): LoginError {
    return new LoginError(LoginErrorTypeEnum.UNKNOWN_ERROR);
  }
}

export enum LoginErrorTypeEnum {
  CREDENTIALS_ERROR,
  EMAIL_NOT_VERIFIED_ERROR,
  UNKNOWN_ERROR,
}

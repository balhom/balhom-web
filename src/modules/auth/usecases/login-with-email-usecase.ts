import { Either } from "../../../common/data/either";
import { LoginError } from "../data/errors/login-error";

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<Either<LoginError, void>> => {
  try {
    // TODO call signInWithEmailAndPassword

    // TODO if emial not verified: return Either.left(LoginError.emailNotVerifiedError());

    // TODO remove
    console.log(email, password);

    return Either.right(undefined);
  } catch (error) {
    // TODO parse error code to LoginError

    // TODO remove
    console.log(error);

    return Either.left(LoginError.credentialsError());
  }
};

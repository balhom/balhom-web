import { Either } from "../../../common/data/either";
import { RegisterError } from "../data/errors/register-error";

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<Either<RegisterError, void>> => {
  try {
    // TODO call createUserWithEmailAndPassword and then logout if needed

    // TODO remove
    console.log(email, password);

    return Either.right(undefined);
  } catch (error) {
    // TODO parse error code to RegisterError

    // TODO remove
    console.log(error);

    return Either.left(RegisterError.unknownError());
  }
};

import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  ServerError,
} from "./error";

export function commonErrorHandler(error) {
  const status = error.response.status;

  if (status === 400) {
    throw new BadRequestError();
  } else if (status === 401) {
    throw new UnauthorizedError();
  } else if (status === 403) {
    throw new ForbiddenError();
  } else if (status === 500) {
    throw new ServerError();
  } else {
    throw new Error();
  }
}

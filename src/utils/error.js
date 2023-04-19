import { useAuthStore } from "@/modules/login/store";
import { useSnackBarStore } from "@/store/snackbar";

export class BadRequestError extends Error {}
export class ForbiddenError extends Error {}
export class ServerError extends Error {}
export class UnauthorizedError extends Error {}
export class UserCredentialsError extends Error {}

export function handleError(error) {
  const auth = useAuthStore();
  const snackbar = useSnackBarStore();

  if (error instanceof UnauthorizedError) {
    auth.logout();
    let data = {
      text: "Something went wrong",
      shown: true,
      color: "error",
      id: "error--general",
    };
    snackbar.setMessage(data);
  } else if (error instanceof BadRequestError) {
    let data = {
      text: "Bad Request Error",
      shown: true,
      color: "error",
      id: "error--forbidden",
    };
    snackbar.setMessage(data);
  } else if (error instanceof ForbiddenError) {
    let data = {
      text: "Forbidden Error",
      shown: true,
      color: "error",
      id: "error--forbidden",
    };
    snackbar.setMessage(data);
  } else if (error instanceof ServerError) {
    let data = {
      text: "Internal Server Error",
      shown: true,
      color: "error",
      id: "error--forbidden",
    };
    snackbar.setMessage(data);
  } else if (error instanceof UserCredentialsError) {
    let data = {
      text: "User Credentials Doesnot match.",
      shown: true,
      color: "error",
      id: "error--forbidden",
    };
    snackbar.setMessage(data);
  } else {
    let data = {
      text: "Something went wrong",
      shown: true,
      color: "error",
      id: "error--general",
    };
    snackbar.setMessage(data);
  }
}

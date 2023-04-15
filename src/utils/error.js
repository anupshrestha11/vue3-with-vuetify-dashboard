import { useAppStore } from "@/store/app";

const store = useAppStore();

export class UserCredentialsError extends Error {}
export class UnauthorizedError extends Error {}

export function handleError(error) {
  if (error instanceof UnauthorizedError) {
    store.auth.logout().then(() => {
      window.location.href = "/login";
    });
  }
}

export const ADMIN_AUTH_KEY = "rizq-admin-authenticated";

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

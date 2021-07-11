// Put shared constants here

export const HTTP_ERROR_400 = "Invalid request";
export const HTTP_ERROR_401 = "Unauthorized";
export const HTTP_ERROR_403 = "Forbidden;"
export const HTTP_ERROR_404 = "Not found";
export const HTTP_ERROR_409 = "Conflict";
export const HTTP_ERROR_500 = "Internal server error";

export const PASSWORD_HASH_KEY = process.env.PASSWORD_SHA512_KEY || "insecure_key";

import store from "@/utils/store";

export function getToken(): string | null {
    return localStorage.getItem('authToken');
}

export function setToken(token: string | null): void {
    if (token === null) {
        localStorage.removeItem('authToken');
    } else
        localStorage.setItem('authToken', token);
}

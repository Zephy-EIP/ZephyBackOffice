import axios from 'axios';

export function passwordIsValid(password: string): boolean {
    return /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,128}/.test(password);
}

export function usernameIsValid(username: string): boolean {
    username = username.trim();
    return username.length >= 3 && /^[a-zA-Z0-9 ]*$/.test(username) && username.length < 50;
}

export function emailIsValid(email: string): boolean {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) && email.length < 255;
}

export interface BasicPayload<T = any> {
    success: boolean,
    error: number,
    data?: T,
}

export function getBasicErrorPayloadAxios<T = any>(err: any): BasicPayload<T> {
    if (axios.isAxiosError(err)) {
        if (typeof err.response?.status === 'number')
            return { success: false, error: err.response.status };
    }
    return { success: false, error: 500 };
}

export function getBasicDataPayload<T>(data?: T): BasicPayload<T> {
    return { success: true, error: 0, data };
}

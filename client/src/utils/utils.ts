import axios from 'axios';

export function passwordIsValid(password: string): boolean {
    return /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,128}/.test(password);
}

export function usernameIsValid(username: string): boolean {
    return username.length >= 3 && /^[a-zA-Z0-9 ]*$/.test(username) && username.length < 50;
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

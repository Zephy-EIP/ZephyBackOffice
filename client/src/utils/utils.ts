export function passwordIsValid(password: string): boolean {
    return /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,128}/.test(password);
}

export function usernameIsValid(username: string): boolean {
    return username.length >= 3 && /^[a-zA-Z0-9 ]*$/.test(username) && username.length < 50;
}

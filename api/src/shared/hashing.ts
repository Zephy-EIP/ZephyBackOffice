import crypto from 'crypto';
import { PASSWORD_HASH_KEY } from '@/shared/constants';

export function generateSalt(rounds: number = 12): string {
    return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
}

export function hashPassword(password: string, salt: string): string {
    let hash = crypto.createHmac('sha512', PASSWORD_HASH_KEY);
    hash.update(password + salt);
    let value = hash.digest('hex');
    return value;
}

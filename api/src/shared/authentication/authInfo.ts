import User from '@/entities/User';
import Session from '@/entities/Session';

export default class AuthInfo {
    user: User = new User();
    session: Session = new Session();
}

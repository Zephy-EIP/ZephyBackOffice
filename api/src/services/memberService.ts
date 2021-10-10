import MemberDao from '@/daos/Member/MemberDao';
import Member from '@/entities/Member';

namespace MemberService {
    export async function create(name: string): Promise<boolean> {
        return await MemberDao.add(name);
    }

    export async function deleteMember(name: string): Promise<boolean> {
        return await MemberDao.delete(name);
    }

    export async function list(): Promise<Member[]> {
        return await MemberDao.list();
    }

}

export default MemberService;

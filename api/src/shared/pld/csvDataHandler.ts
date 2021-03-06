import Member from '@/entities/Member';
import logger from '@/shared/logger';
import SprintData, { CSVEntry, MemberLoad, StatusType } from '@/shared/pld/dataType';

namespace CSVDataHandler {

    function validateBasicFieldTypes(entry: CSVEntry): boolean {
        if (typeof entry.Name !== 'string' ||
            typeof entry.Status !== 'string' ||
            typeof entry.Sprint !== 'string' ||
            typeof entry.Livrable !== 'string' ||
            typeof entry['Sous-livrable'] !== 'string' ||
            typeof entry['Charge estimée (J/H)'] !== 'string' ||
            typeof entry['Assign to'] !== 'string' ||
            typeof entry['En tant que'] !== 'string' ||
            typeof entry['Je veux'] !== 'string'
           )
            return false;
        return true;
    }

    function validateMemberFieldTypes(entry: any, members: Member[]): boolean {
        try {
            for (const member of members) {
                const firstname: string = member.member_name.split(' ')[0];
                if (typeof entry[firstname] !== 'string' && entry[firstname] !== undefined)
                    return false;
                if (typeof entry[`Status ${firstname}`] !== 'string' && entry[`Status ${firstname}`] !== undefined)
                    return false;
                return true;
            }
        } catch { return false; }
        return false;
    }

    function validateAssignTo(entry: CSVEntry, members: Member[]): boolean {
        const assignees = entry['Assign to'].split(', ').map(a => a.toLowerCase());
        const membersLower = members.map(mem => mem.member_name.toLowerCase());

        for (const assignee of assignees) {
            if (assignee.length === 0)
                continue;
            if (membersLower.find(mem => mem === assignee) === undefined)
                return false;
        }
        return true;
    }

    function validateCharge(entry: any, members: Member[]): boolean {
        try {
            const totalCharge = parseFloat(entry['Charge estimée (J/H)']);
            let chargeFound = 0;

            for (const member of members) {
                const firstname: string = member.member_name.split(' ')[0];
                if (entry[firstname] === undefined || entry[firstname] === '')
                    continue;

                chargeFound += parseFloat(entry[firstname]);
            }

            return chargeFound === totalCharge;

        } catch { return false; }
    }

    export function validateStatus(entry: CSVEntry): boolean {
        return entry.Status === 'Completed' || entry.Status === 'In progress' || entry.Status === 'Not started' || entry.Status === '';
    }

    export function validateData(entries: CSVEntry[], members: Member[], sprintName: string): {
        entries?: CSVEntry[],
        error?: string
    } {
        for (const entry of entries)
            if (!validateBasicFieldTypes(entry))
                return {error: 'Wrong file format.'};
        entries = entries.filter(entry => entry.Sprint === sprintName);
        if (entries.length === 0)
            return {error: 'No entries for sprint.'};
        for (const entry of entries) {
            if (!validateMemberFieldTypes(entry, members)) {
                logger.err('PLD Creation: Invalid member field types with entry: ' + entry.Name);
                return {error: 'Invalid member field types with entry: ' + entry.Name};
            } else if (!validateAssignTo(entry, members)) {
                logger.err('PLD Creation: Invalid assignments with entry: ' + entry.Name);
                return {error: 'Invalid assignments with entry: ' + entry.Name};
            } else if (!validateCharge(entry, members)) {
                logger.err('PLD Creation: Invalid charge with entry: ' + entry.Name);
                return {error: 'Invalid charge with entry: ' + entry.Name};
            } else if (!validateStatus(entry)) {
                logger.err('PLD Creation: Invalid statuses with entry: ' + entry.Name);
                return {error: 'Invalid statuses with entry: ' + entry.Name};
            }
        }
        return {entries};
    }

    function getDod(entry: CSVEntry): string[] {
        return entry['Definition of Done'].split('\n');
    }

    function getStatus(status: string): StatusType {
        switch (status) {
            case 'Completed':
                return 'done';
            case 'In progress':
                return 'in progress';
            case 'Not started':
                return 'not started';
        }
        return 'not started';
    }

    function getMemberLoads(entry: CSVEntry, members: Member[]): MemberLoad[] {
        const loads: MemberLoad[] = [];

        for (const member of members) {
            const firstname: string = member.member_name.split(' ')[0];
            if ((entry as any)[firstname] === undefined || (entry as any)[firstname] === '')
                continue
            let memberLoad = parseFloat((entry as any)[firstname]);
            if (memberLoad == 0)
                continue
            let status = getStatus(entry.Status);
            if (status !== 'done')
                status = getStatus((entry as any)[`Status ${firstname}`]);
            loads.push({
                load: parseFloat((entry as any)[firstname]),
                memberName: member.member_name,
                status: status,
            });
        }

        return loads;
    }

    export function csvToSprintData(entries: CSVEntry[], members: Member[]): SprintData {
        entries = entries.sort((a, b) => a['Sous-livrable'] < b['Sous-livrable'] ? -1 : 1);
        let data: SprintData = { deliverables: [] };
        if (entries.length === 0)
            return data;
        let currentDeliverable = entries[0].Livrable;
        data.deliverables.push({userStories: [], name: currentDeliverable});

        for (const entry of entries) {
            if (entry.Livrable !== currentDeliverable) {
                currentDeliverable = entry.Livrable;
                data.deliverables.push({userStories: [], name: currentDeliverable});
            }
            const dod: string[] = getDod(entry);
            const status: StatusType = getStatus(entry.Status);
            const memberLoads: MemberLoad[] = getMemberLoads(entry, members);

            data.deliverables[data.deliverables.length - 1].userStories.push({
                title: entry.Name,
                role: entry['En tant que'],
                goal: entry['Je veux'],
                description: entry.Description,
                dod: dod,
                load: parseFloat(entry['Charge estimée (J/H)']),
                status: status,
                memberLoads: memberLoads,
            });
        }

        return data;
    }

}

export default CSVDataHandler;


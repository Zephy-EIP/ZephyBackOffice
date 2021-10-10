import Member from '@/entities/Member';
import logger from '@/shared/logger';
import { CSVEntry } from '@/shared/pld/dataType';

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

            if (totalCharge.toString() == 'NaN')
                logger.info(JSON.stringify(entry));

            for (const member of members) {
                const firstname: string = member.member_name.split(' ')[0];
                if (entry[firstname] === '')
                    continue;

                chargeFound += parseFloat(entry[firstname]);
            }

            return chargeFound === totalCharge;

        } catch { return false; }
    }

    export function validateData(entries: CSVEntry[], members: Member[], sprintName: string): boolean {
        for (const entry of entries)
            if (!validateBasicFieldTypes(entry))
                return false;
        entries = entries.filter(entry => entry.Sprint === sprintName);
        for (const entry of entries) {
            if (!validateMemberFieldTypes(entry, members) ||
                !validateAssignTo(entry, members) ||
                !validateCharge(entry, members))
                return false;
        }
        return true;
    }

}

export default CSVDataHandler;

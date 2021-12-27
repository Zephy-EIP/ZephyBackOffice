import { SideMenuConfig } from '@/components/templates/sideMenu/SideMenu';

export default function getSideMenuConfig() {
    const sideMenuOptions: SideMenuConfig[] = [];

    // Profile menu
    sideMenuOptions.push({ title: 'Profile', href: '/profile', minImportance: null });

    // Administration menu
    sideMenuOptions.push(
        {
            title: 'Administration',
            href: '/administration',
            minImportance: 0,
        }
    );

    // Test page
    sideMenuOptions.push(
        {
            title: 'PLD',
            href: '/pld',
            minImportance: 1000,
        }
    );

    sideMenuOptions.push(
        {
            title: 'Sprints',
            href: '/pld/sprints',
            minImportance: 1000,
        }
    )

    sideMenuOptions.push(
        {
            title: 'Members',
            href: '/pld/members',
            minImportance: 1000,
        }
    )

    sideMenuOptions.push(
        {
            title: 'Sprint Parts',
            href: '/pld/sprint-parts',
            minImportance: 1000,
        }
    )

    sideMenuOptions.push(
        {
            title: 'Sprint Reports',
            href: '/pld/reports',
            minImportance: 1000,
        }
    )

    sideMenuOptions.push(
        {
            title: 'Changelogs',
            href: '/pld/changelogs',
            minImportance: 1000,
        }
    )

    return sideMenuOptions;
}

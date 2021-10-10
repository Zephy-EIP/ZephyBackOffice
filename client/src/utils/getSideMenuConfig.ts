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
            title: 'Test',
            href: '/test',
            minImportance: 0,
        }
    );

    return sideMenuOptions;
}

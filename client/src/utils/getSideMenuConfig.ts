import { SideMenuConfig } from "@/components/templates/sideMenu/SideMenu";

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
            subMenus: [
                {
                    title: 'Manage Roles',
                    id: '#manage-roles',
                },
                {
                    title: 'Create Roles',
                    id: '#create-roles',
                },
                {
                    title: 'Manage Users',
                    id: '#manage-users',
                },
                {
                    title: 'Create Users',
                    id: '#create-users',
                },
            ]
        }
    );

    return sideMenuOptions;
}

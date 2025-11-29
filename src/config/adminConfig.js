export const ADMIN_ROLES = {
    SUPER_ADMIN: 'superadmin',
    ADMIN: 'admin',
    MODERATOR: 'moderator'
};

export const ADMIN_PERMISSIONS = {
    ALL: 'all',
    MANAGE_TRIPS: 'manage_trips',
    MANAGE_BOOKINGS: 'manage_bookings',
    MANAGE_USERS: 'manage_users',
    VIEW_ANALYTICS: 'view_analytics'
};

export const adminAccounts = [
    {
        email: 'admin@travelcommunity.com',
        password: 'Admin@123456',
        role: ADMIN_ROLES.ADMIN,
        name: 'Admin User',
        permissions: [
            ADMIN_PERMISSIONS.MANAGE_TRIPS,
            ADMIN_PERMISSIONS.MANAGE_BOOKINGS,
            ADMIN_PERMISSIONS.MANAGE_USERS,
            ADMIN_PERMISSIONS.VIEW_ANALYTICS
        ]
    },
    {
        email: 'superadmin@travelcommunity.com',
        password: 'SuperAdmin@12345',
        role: ADMIN_ROLES.SUPER_ADMIN,
        name: 'Super Admin',
        permissions: [ADMIN_PERMISSIONS.ALL]
    },
    {
        email: 'moderator@travelcommunity.com',
        password: 'Moderator@12345',
        role: ADMIN_ROLES.MODERATOR,
        name: 'Moderator',
        permissions: [
            ADMIN_PERMISSIONS.MANAGE_BOOKINGS,
            ADMIN_PERMISSIONS.VIEW_ANALYTICS
        ]
    }
];

import {Logger} from "@nestjs/common";
/***
 * App Roles
 *
 *
 */
export enum AppRole {
    begin = 'begin',
    user = 'user',
    company = 'company',
    moder = 'moder'
}

export enum AppPermission {
    /**
     * Getting started
     */
    COMPLETE_PROFILE = 'complete_profile',

    /**
     * Profile
     */
    PROFILE = 'profile',
    PROFILE_READ = 'profile_read',
    PROFILE_DATA_BOOSTRAP = 'profile_data_boostrap',

    /**
     * Post feed
     *
     */
    POST_FEED = 'post_feed',

    /**
     * Friend
     *
     */
    FRIEND = 'friend',

    /**
     * Notifications
     *
     */
    NOTIFICATION = 'notification',

    /**
     * Message
     *
     */
    MESSAGE = 'message',


    /**
     * Jobs
     *
     *
     */
    JOB = 'job',
    JOB_CREATE = 'job_create',

    /**
     * Permission
     *
     */
    PERMISSION_OWNER = 'permission_owner',

    /**
     * Address
     *
     */
    ADDRESS_SEARCH = "address_search",


    /**
     * Skill
     *
     */
    SKILL_SEARCH = "skill_search",
    SKILL_CREATE = "skill_create",
    SKILL_DELETE = "skill_delete",

    /**
     * Work from
     *
     */
    WORK_FROM_SEARCH = 'work_from_search',


    /**
     * Position search
     *
     */
    POSITION_SEARCH = 'position_search',
    POSITION_CREATE = "position_create",

    /**
     * Job level
     *
     */
    JOB_LEVEL_SEARCH = 'job_level_search',


    /**
     * School
     *
     */
    SCHOOL_SEARCH = 'school_search',
    SCHOOL_CREATE = "school_create",


    /**
     * Certificate = 'certificate'
     *
     */
    CERTIFICATE_SEARCH = 'certificate_search',
    CERTIFICATE_CREATE = "certificate_create",

}


export const appRolesConfig: Partial<{ [key in AppRole]: AppPermission[] }> = {
    /**
     * User not complete register
     *
     */
    [AppRole.begin]: [
        AppPermission.PROFILE_DATA_BOOSTRAP,
        AppPermission.COMPLETE_PROFILE,
        AppPermission.ADDRESS_SEARCH,
        AppPermission.SKILL_SEARCH,
        AppPermission.SKILL_CREATE,
        AppPermission.WORK_FROM_SEARCH,
        AppPermission.POSITION_SEARCH,
        AppPermission.POSITION_CREATE,
        AppPermission.PERMISSION_OWNER,
        AppPermission.JOB_LEVEL_SEARCH,
        AppPermission.CERTIFICATE_SEARCH,
        AppPermission.CERTIFICATE_CREATE,
        AppPermission.SCHOOL_SEARCH,
        AppPermission.SCHOOL_CREATE
    ],

    /**
     * User
     *
     */
    [AppRole.user]: [
        AppPermission.PROFILE_DATA_BOOSTRAP,
        AppPermission.POST_FEED,
        AppPermission.FRIEND,
        AppPermission.NOTIFICATION,
        AppPermission.PROFILE,
        AppPermission.MESSAGE,
        AppPermission.JOB,
        AppPermission.ADDRESS_SEARCH,
        AppPermission.SKILL_SEARCH,
        AppPermission.SKILL_CREATE,
        AppPermission.WORK_FROM_SEARCH,
        AppPermission.POSITION_SEARCH,
        AppPermission.POSITION_CREATE,
        AppPermission.PERMISSION_OWNER,
        AppPermission.JOB_LEVEL_SEARCH,
        AppPermission.CERTIFICATE_SEARCH,
        AppPermission.CERTIFICATE_CREATE,
        AppPermission.SCHOOL_SEARCH,
        AppPermission.SCHOOL_CREATE
    ],

    /***
     * Company
     *
     */
    [AppRole.company]: [
        AppPermission.PROFILE_DATA_BOOSTRAP,
        AppPermission.POST_FEED,
        AppPermission.NOTIFICATION,
        AppPermission.PROFILE,
        AppPermission.MESSAGE,
        AppPermission.JOB,
        AppPermission.JOB_CREATE,
        AppPermission.ADDRESS_SEARCH,
        AppPermission.SKILL_SEARCH,
        AppPermission.SKILL_CREATE,
        AppPermission.WORK_FROM_SEARCH,
        AppPermission.POSITION_SEARCH,
        AppPermission.POSITION_CREATE,
        AppPermission.PERMISSION_OWNER,
        AppPermission.JOB_LEVEL_SEARCH,
        AppPermission.CERTIFICATE_SEARCH,
        AppPermission.CERTIFICATE_CREATE,
        AppPermission.SCHOOL_SEARCH,
        AppPermission.SCHOOL_CREATE
    ],

    /**
     * Moder
     *
     */
    [AppRole.moder]: [
    ]
}

export const appRolesConfigHashMap = (function () {
    const result = {...appRolesConfig};
    for (let item in result) {
        result[item] = result[item].reduce((val, item) => {
            val[item] = true;
            return val;
        }, {})
    }
    return result;
})();

(function validRolePermissions() {
    for (let roleName in appRolesConfig) {
        let permissionWarning: string;
        const permissions = appRolesConfig[roleName];
        const warn = permissions.some((permission) => {
            permissionWarning = permission;
            return permissions.filter(item => item === permission).length > 1;
        })
        if (warn) {
            const logger = new Logger();
            logger.warn(`duplicate permission ${permissionWarning} in role ${roleName}`);
        }
    }
})();

export const hasUserTagged = (user: { role: string }) => {
    return user.role === AppRole.user || user.role === AppRole.company || user.role === AppRole.begin;
}
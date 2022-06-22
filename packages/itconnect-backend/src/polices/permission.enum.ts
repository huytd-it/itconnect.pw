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
    LOGOUT = 'logout',

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
    PROFILE_USER_CE = 'profile_user_ce',
    PROFILE_COMPANY_CE = 'profile_company_ce',

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
    SKILL_CREATE_TAG = "skill_create_tag",
    USER_SKILL_GET_ALL = 'user_skill_get_all',
    USER_SKILL_CE = 'user_skill_ce',
    USER_SKILL_DELETE = 'user_skill_delete',

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
    POSITION_CREATE_TAG = "position_create_tag",
    USER_POSITION_GET_ALL = 'user_position_get_all',
    USER_POSITION_CE = 'user_position_ce',
    USER_POSITION_DELETE = 'user_position_delete',

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
    SCHOOL_CREATE_TAG = "school_create_tag",


    /**
     * Certificate = 'certificate'
     *
     */
    CERTIFICATE_SEARCH = 'certificate_search',
    CERTIFICATE_CREATE_TAG = "certificate_create_tag",


    /**
     * Company tag = 'company_tag'
     *
     */
    COMPANY_TAG_SEARCH = 'company_tag_search',
    COMPANY_TAG_CREATE_TAG = "company_tag_create_tag",

}


export const appRolesConfig: Partial<{ [key in AppRole]: AppPermission[] }> = {
    /**
     * User not complete register
     *
     */
    [AppRole.begin]: [
        AppPermission.LOGOUT,
        AppPermission.PROFILE_DATA_BOOSTRAP,
        AppPermission.PROFILE_USER_CE,
        AppPermission.PROFILE_COMPANY_CE,
        AppPermission.COMPLETE_PROFILE,
        AppPermission.ADDRESS_SEARCH,
        AppPermission.PERMISSION_OWNER,
        AppPermission.JOB_LEVEL_SEARCH
    ],

    /**
     * User
     *
     */
    [AppRole.user]: [
        AppPermission.LOGOUT,
        AppPermission.PROFILE_DATA_BOOSTRAP,
        AppPermission.PROFILE_USER_CE,
        AppPermission.POST_FEED,
        AppPermission.FRIEND,
        AppPermission.NOTIFICATION,
        AppPermission.PROFILE,
        AppPermission.MESSAGE,
        AppPermission.JOB,
        AppPermission.JOB_CREATE,
        AppPermission.ADDRESS_SEARCH,
        AppPermission.SKILL_SEARCH,
        AppPermission.SKILL_CREATE_TAG,
        AppPermission.USER_SKILL_CE,
        AppPermission.USER_SKILL_GET_ALL,
        AppPermission.USER_SKILL_DELETE,
        AppPermission.WORK_FROM_SEARCH,
        AppPermission.POSITION_SEARCH,
        AppPermission.POSITION_CREATE_TAG,
        AppPermission.USER_POSITION_CE,
        AppPermission.USER_POSITION_DELETE,
        AppPermission.USER_POSITION_GET_ALL,
        AppPermission.PERMISSION_OWNER,
        AppPermission.JOB_LEVEL_SEARCH,
        AppPermission.CERTIFICATE_SEARCH,
        AppPermission.CERTIFICATE_CREATE_TAG,
        AppPermission.SCHOOL_SEARCH,
        AppPermission.SCHOOL_CREATE_TAG,
        AppPermission.COMPANY_TAG_SEARCH,
        AppPermission.COMPANY_TAG_CREATE_TAG,
    ],

    /***
     * Company
     *
     */
    [AppRole.company]: [
        AppPermission.LOGOUT,
        AppPermission.PROFILE_DATA_BOOSTRAP,
        AppPermission.PROFILE_COMPANY_CE,
        AppPermission.POST_FEED,
        AppPermission.NOTIFICATION,
        AppPermission.PROFILE,
        AppPermission.MESSAGE,
        AppPermission.JOB,
        AppPermission.JOB_CREATE,
        AppPermission.ADDRESS_SEARCH,
        AppPermission.SKILL_SEARCH,
        AppPermission.SKILL_CREATE_TAG,
        AppPermission.WORK_FROM_SEARCH,
        AppPermission.POSITION_SEARCH,
        AppPermission.POSITION_CREATE_TAG,
        AppPermission.PERMISSION_OWNER,
        AppPermission.JOB_LEVEL_SEARCH,
        AppPermission.CERTIFICATE_SEARCH,
        AppPermission.CERTIFICATE_CREATE_TAG,
        AppPermission.SCHOOL_SEARCH,
        AppPermission.SCHOOL_CREATE_TAG,
        AppPermission.COMPANY_TAG_SEARCH,
        AppPermission.COMPANY_TAG_CREATE_TAG,
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
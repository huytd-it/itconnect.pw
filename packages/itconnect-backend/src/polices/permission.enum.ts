export enum AppRole {
    Begin = 'begin',
    User = 'user',
    Company = 'company',
    Moder = 'moder'
}

export enum AppPermission {
    COMPLETE_PROFILE,

    PROFILE_READ
}

export const appRolesConfig: Partial<{ [key in AppRole]: AppPermission[] }> = {
    /**
     * User not complete register
     *
     */
    [AppRole.Begin]: [
        AppPermission.COMPLETE_PROFILE,
        AppPermission.PROFILE_READ
    ],

    /**
     * User
     *
     */
    [AppRole.User]: [
    ],

    /***
     * Company
     *
     */
    [AppRole.Company]: [
    ],

    /**
     * Moder
     *
     */
    [AppRole.Moder]: [
    ]
}

export const appPermissionKey2Name = Object.values(AppPermission);

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
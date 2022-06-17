export enum AppRole {
  Begin = 'begin',
  User = 'user',
  Company = 'company',
  Moder = 'moder',
}


export enum AppPermission {
  /**
   * Getting started
   */
  COMPLETE_PROFILE,

  /**
   * Profile
   */
  PROFILE,
  PROFILE_READ,

  /**
   * Post feed
   *
   */
  POST_FEED,

  /**
   * Friend
   *
   */
  FRIEND,

  /**
   * Notifications
   *
   */
  NOTIFICATION,

  /**
   * Message
   *
   */
  MESSAGE
}


export type AppPermissionHashMap = Partial<{ [key in AppPermission]: boolean }>;

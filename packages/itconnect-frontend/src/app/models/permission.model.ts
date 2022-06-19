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

  /**
   * Work from
   *
   */
  WORK_FROM_SEARCH = 'work_from_search',


  /**
   * Position search
   *
   */
  POSITION_SEARCH = 'position_search'
}

export type AppPermissionHashMap = Partial<{ [key in AppPermission]: boolean }>;

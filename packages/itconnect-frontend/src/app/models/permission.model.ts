export enum AppRole {
  Begin = 'begin',
  User = 'user',
  Company = 'company',
  Moder = 'moder',
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

}

export type AppPermissionHashMap = Partial<{ [key in AppPermission]: boolean }>;

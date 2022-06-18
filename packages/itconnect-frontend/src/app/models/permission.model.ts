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
  JOB_CREATE = 'job_create'
}


export type AppPermissionHashMap = Partial<{ [key in AppPermission]: boolean }>;

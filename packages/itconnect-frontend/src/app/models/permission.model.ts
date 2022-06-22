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


  /**
   * Cv Work Experience
   *
   */
  CV_WORK_EXPERIENCE = 'cv_work_experience',
  CV_WORK_EXPERIENCE_GET_OWNER = 'cv_work_experience_get_owner',
  CV_WORK_EXPERIENCE_CE = 'cv_work_experience_ce',
  CV_WORK_EXPERIENCE_SKILL_CE = 'cv_work_experience_skill_ce',
  CV_WORK_EXPERIENCE_SKILL_DELETE = 'cv_work_experience_skill_delete',
  CV_WORK_EXPERIENCE_POSITION_CE = 'cv_work_experience_position_ce',
  CV_WORK_EXPERIENCE_POSITION_DELETE = 'cv_work_experience_position_delete',
}


export type AppPermissionHashMap = Partial<{ [key in AppPermission]: boolean }>;

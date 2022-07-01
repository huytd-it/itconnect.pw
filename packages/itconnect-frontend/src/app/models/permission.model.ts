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
  PROFILE_COMPUTE_YOE = 'profile_compute_yoe',

  /**
   * User
   *
   */
  PEOPLE = 'people',
  PEOPLE_SEARCH = 'people_search',

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
  JOB_CE = 'job_ce',
  JOB_DELETE = 'job_delete',
  JOB_SEARCH = 'job_search',

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
   * ranked_academic
   *
   */
  RANKED_ACADEMIC_SEARCH = 'ranked_academic_search',

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
  USER_CERTIFICATE_GET_BY_CERT_ID = 'user_certificate_get_by_cert_id',
  USER_CERTIFICATE_GET_ALL = 'user_certificate_get_all',
  USER_CERTIFICATE_CE = 'user_certificate_ce',
  USER_CERTIFICATE_DELETE = 'user_certificate_delete',

  /**
   * Company tag = 'company_tag'
   *
   */
  COMPANY_TAG_SEARCH = 'company_tag_search',
  COMPANY_TAG_CREATE_TAG = "company_tag_create_tag",
  COMPANY_TAG_ADD_MST = "company_tag_add_mst",


  /**
   * Cv Work Experience
   *
   */
  CV_WORK_EXPERIENCE = 'cv_work_experience',
  CV_WORK_EXPERIENCE_DELETE = 'cv_work_experience_delete',
  CV_WORK_EXPERIENCE_GET_OWNER = 'cv_work_experience_get_owner',
  CV_WORK_EXPERIENCE_CE = 'cv_work_experience_ce',
  CV_WORK_EXPERIENCE_SKILL_CE = 'cv_work_experience_skill_ce',
  CV_WORK_EXPERIENCE_SKILL_DELETE = 'cv_work_experience_skill_delete',
  CV_WORK_EXPERIENCE_POSITION_CE = 'cv_work_experience_position_ce',
  CV_WORK_EXPERIENCE_POSITION_DELETE = 'cv_work_experience_position_delete',

  /**
   * Cv Certificate
   *
   */
  CV_CERTIFICATE = 'cv_certificate',
  CV_CERTIFICATE_DELETE = 'cv_certificate_delete',
  CV_CERTIFICATE_GET_OWNER = 'cv_certificate_get_owner',
  CV_CERTIFICATE_CE = 'cv_certificate_ce',

  /**
   * Cv Education
   *
   */
  CV_EDUCATION = 'cv_education',
  CV_EDUCATION_DELETE = 'cv_education_delete',
  CV_EDUCATION_GET_OWNER = 'cv_education_get_owner',
  CV_EDUCATION_CE = 'cv_education_ce',

  /**
   * Job Type
   *
   */
  JOB_TYPE = 'job_type',
  JOB_TYPE_SEARCH = 'job_type_search',

  /**
   * Company 3Rd
   *
   */
  COMPANY_3RD = 'company_3rd',
  COMPANY_3RD_SEARCH = 'company_3rd_search',


  /**
   * JOB APPLY
   *
   */
  JOB_APPLY = 'JOB_APPLY',
  JOB_APPLY_SEARCH = 'JOB_APPLY_SEARCH',
  JOB_APPLY_CREATE = 'JOB_APPLY_CREATE',
  JOB_APPLY_DELETE = 'JOB_APPLY_DELETE',

  /**
   * JOB SAVED
   *
   */
  JOB_SAVED = 'JOB_SAVED',
  JOB_SAVED_SEARCH = 'JOB_SAVED_SEARCH',
  JOB_SAVED_CREATE = 'JOB_SAVED_CREATE',
  JOB_SAVED_DELETE = 'JOB_SAVED_DELETE',

  /**
   * JOB_SUGGEST
   *
   */
  JOB_SUGGEST = 'job_suggest',

  POINT_JOB_USER_SEARCH = 'point_job_user_search',

  PEOPLE_SUGGEST = 'people_suggest',
}

export type AppPermissionHashMap = Partial<{ [key in AppPermission]: boolean }>;

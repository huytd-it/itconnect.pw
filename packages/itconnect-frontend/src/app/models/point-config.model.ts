export enum PointConfigType {
  Skill = 'skill',
  Position = 'position',
  Certificate = 'certificate',
  School = 'school',
  WorkFrom = 'workFrom',
  JobLevel = 'jobLevel',
  JobType = 'jobType',
  Yoe = 'yoe',
}

export const PointConfigName = {
  [PointConfigType.Skill]: 'Kỹ năng',
  [PointConfigType.Position]: 'Vị trí',
  [PointConfigType.Certificate]: 'Văn bằng/chứng chỉ',
  [PointConfigType.School]: 'Học vấn',
  [PointConfigType.WorkFrom]: 'Hình thức làm việc',
  [PointConfigType.JobLevel]: 'Trình độ công việc',
  [PointConfigType.JobType]: 'Loại công việc',
  [PointConfigType.Yoe]: 'Kinh nghiệm làm việc',
}

export const PointConfigKL = {
  [PointConfigType.Skill]: {
    p1: true,
    p2: true,
    p3: true
  },
  [PointConfigType.Position]: {
    p1: true,
    p2: true,
    p3: true
  },
  [PointConfigType.Certificate]: {
    p1: true,
    p2: false,
    p3: false
  },
  [PointConfigType.School]: {
    p1: true,
    p2: false,
    p3: false
  },
  [PointConfigType.WorkFrom]: {
    p1: false,
    p2: true,
    p3: true
  },
  [PointConfigType.JobLevel]: {
    p1: false,
    p2: true,
    p3: true
  },
  [PointConfigType.JobType]: {
    p1: false,
    p2: true,
    p3: true
  },
  [PointConfigType.Yoe]: {
    p1: true,
    p2: false,
    p3: false
  },
}


export class PointConfig {
  type: PointConfigType;
  point: number;
  pointExp: number;
  pointExpVerified: number;
}

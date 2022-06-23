
export class jobTagRange {
  id?: number;
  levelMax: number;
  levelMin: number;
  name: string; // refactor
}


export class JobPosition extends jobTagRange {
  position: number;
}


export class JobSkill extends jobTagRange {
  skill: number;
}

export class JobCertificate extends jobTagRange {
  certificate: number;
}

export class JobSchool extends jobTagRange {
  school: number;
}

export class JobWorkFrom {
  workFrom: number;
  name: string; // refactor
}

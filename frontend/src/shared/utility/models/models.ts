export interface IProject {
  id?: number;
  userId: number;
  projectName: string;
  clientName: string;
  description: string;
  reportingManager: string;
  status: string;
  projectType: string;
}

export interface ITask {
  id?:number;
  name: string;
  userId?: number;
  projectId?: number;
  category: string;
  description: string;
  billingType: string;
  status: string;
}

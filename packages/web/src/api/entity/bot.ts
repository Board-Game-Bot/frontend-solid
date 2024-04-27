export enum BotStatus {
  Hibernating = 'Hibernating',
  Deploying = 'Deploying',
  Working = 'Working',
  Terminating = 'Terminating',
  Failed = 'Failed',
}

export interface Bot {
  Id: string;
  Name: string;
  Description: string;
  GameId: string;
  Lang: string;
  Code: string;
  CreateTime: Date;
  Status: BotStatus;
  StatusMessage?: string;
  ContainerId?: string;
  UserId: string;
}

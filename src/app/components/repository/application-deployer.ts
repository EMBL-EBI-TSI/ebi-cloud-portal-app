export interface ApplicationDeployer {
  name: string;
  repoUri: string;
  deploying: boolean;
  destroying: boolean;
}

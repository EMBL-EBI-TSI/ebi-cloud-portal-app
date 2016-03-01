export interface ApplicationDeployer {
  name: string;
  repoUri: string;
  deploying: boolean;
  attachedVolumeReference: string;
  destroying: boolean;
}

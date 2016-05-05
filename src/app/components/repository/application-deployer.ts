export interface ApplicationDeployer {
  name: string;
  repoUri: string;
  deploying: boolean;
  parameters: string[];
  attachedVolumeReference: string;
  destroying: boolean;
}

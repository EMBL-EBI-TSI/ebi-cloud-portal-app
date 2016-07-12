export interface VolumeDeployer {
  name: string;
  repoUri: string;
  deploying: boolean;
  removing: boolean;
}

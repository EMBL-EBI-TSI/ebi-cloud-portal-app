export interface ApplicationDeployer {
  name: string;
  repoUri: string;
  deploying: boolean;
  parameters: string[];
  volumes: string[];
  attachedVolumeReference: string;
  attachedVolumes: { [id: string]: string };
  destroying: boolean;
}

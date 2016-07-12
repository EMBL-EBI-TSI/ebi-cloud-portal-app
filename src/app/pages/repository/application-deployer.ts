export interface ApplicationDeployer {
  name: string;
  repoUri: string;
  deploying: boolean;
  parameters: string[];
  volumes: string[];
  attachedVolumes: { [id: string]: string };
  destroying: boolean;
}

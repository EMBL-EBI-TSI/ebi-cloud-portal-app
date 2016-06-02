import { DeploymentAttachedVolume } from './deployment-attached-volume';

export interface Deployment {
  reference: string;
  applicationName: string;
  providerId: string;
  accessIp: string;
  volumeInstanceReference: string;
  attachedVolumes: DeploymentAttachedVolume[];
}

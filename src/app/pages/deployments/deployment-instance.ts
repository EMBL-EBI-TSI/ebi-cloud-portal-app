import { DeploymentAttachedVolume } from '../../services/deployment/deployment-attached-volume';

export interface DeploymentInstance {
  reference: string;
  applicationName: string;
  providerId: string;
  accessIp: string;
  attachedVolumes: DeploymentAttachedVolume[];
  destroying: boolean;
}

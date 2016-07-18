import { DeploymentAttachedVolume } from 'ng2-tsi-cloud-portal-lib';

export interface DeploymentInstance {
  reference: string;
  applicationName: string;
  providerId: string;
  accessIp: string;
  attachedVolumes: DeploymentAttachedVolume[];
  destroying: boolean;
}

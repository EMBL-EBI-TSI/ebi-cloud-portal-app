export interface DeploymentInstance {
  reference: string;
  applicationName: string;
  providerId: string;
  accessIp: string;
  volumeInstanceReference: string;
  destroying: boolean;
}

import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DeploymentInstance } from 'ng2-cloud-portal-presentation-lib';

@Pipe({
    name: 'deploymentStatus',
    pure: false
})
@Injectable()
export class DeploymentStatusPipe implements PipeTransform {
    transform(items: DeploymentInstance[], status: string[]): DeploymentInstance[] {
        return items.filter(item => (status.indexOf(item.status)!=-1));
    }
}

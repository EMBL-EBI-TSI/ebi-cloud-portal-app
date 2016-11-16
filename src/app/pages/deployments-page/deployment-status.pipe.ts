import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DeploymentInstance } from 'ng2-cloud-portal-presentation-lib';

@Pipe({
    name: 'deploymentStatus'
})
@Injectable()
export class DeploymentStatusPipe implements PipeTransform {
    transform(items: DeploymentInstance[], status: String): DeploymentInstance[] {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => (item.status==status));
    }
}

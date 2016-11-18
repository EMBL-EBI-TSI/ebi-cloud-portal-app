import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ApplicationDeployer } from 'ng2-cloud-portal-presentation-lib';
import { ApplicationCloudProvider } from 'ng2-cloud-portal-service-lib';

@Pipe({
    name: 'applicationCloudProvider',
    pure: false
})
@Injectable()
export class ApplicationCloudProviderPipe implements PipeTransform {
    transform(items: ApplicationDeployer[], cloudProviders: string[]): ApplicationDeployer[] {
        return items.filter(item => {
            let keep = false;
            item.cloudProviders.forEach(theProvider => {
                keep = keep || cloudProviders.indexOf(theProvider.cloudProvider)!=-1;
            });
            return keep;
        });
    }
}

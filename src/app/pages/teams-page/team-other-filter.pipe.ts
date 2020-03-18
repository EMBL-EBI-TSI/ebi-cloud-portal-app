import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TeamPresenter } from 'ng2-cloud-portal-presentation-lib';
import { CredentialService } from 'ng2-cloud-portal-service-lib';

@Pipe({
    name: 'teamOtherExclude',
    pure: false
})
@Injectable()
export class TeamOtherExcludeFilterPipe implements PipeTransform {

    constructor(public credentialService: CredentialService) {}

    transform(items: TeamPresenter[], excludeOther: boolean): TeamPresenter[] {
        return items.filter(item => {
            if (excludeOther) {
              return item.isOwner || item.memberAccountEmails.includes(this.credentialService.getEmail());
            } else {
              return true;
            }
        });
    }
}

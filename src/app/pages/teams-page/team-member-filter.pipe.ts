import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TeamPresenter } from 'ng2-cloud-portal-presentation-lib';
import { CredentialService } from 'ng2-cloud-portal-service-lib';

@Pipe({
    name: 'teamMemberExclude',
    pure: false
})
@Injectable()
export class TeamMemberExcludeFilterPipe implements PipeTransform {
    
    constructor(public credentialService: CredentialService) {}

    transform(items: TeamPresenter[], excludeImMember: boolean): TeamPresenter[] {
        return items.filter(item => {
            if (excludeImMember) {
              return !item.memberAccountEmails.includes(this.credentialService.getEmail());
            } else {
              return true;
            }
        });
    }
}

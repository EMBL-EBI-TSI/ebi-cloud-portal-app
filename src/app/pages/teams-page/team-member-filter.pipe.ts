import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TeamPresenter } from 'ng2-cloud-portal-presentation-lib';

@Pipe({
    name: 'teamMemberExclude',
    pure: false
})
@Injectable()
export class TeamMemberExcludeFilterPipe implements PipeTransform {
    transform(items: TeamPresenter[], excludeImMember: boolean): TeamPresenter[] {
        return items.filter(item => {
            if (excludeImMember) {
              return !item.isMember;
            } else {
              return true;
            }
        });
    }
}

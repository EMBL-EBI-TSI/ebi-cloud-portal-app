import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TeamPresenter } from 'ng2-cloud-portal-presentation-lib';

@Pipe({
    name: 'teamOtherExclude',
    pure: false
})
@Injectable()
export class TeamOtherExcludeFilterPipe implements PipeTransform {
    transform(items: TeamPresenter[], excludeOther: boolean): TeamPresenter[] {
        return items.filter(item => {
            if (excludeOther) {
              return item.isOwner || item.isMember;
            } else {
              return true;
            }
        });
    }
}

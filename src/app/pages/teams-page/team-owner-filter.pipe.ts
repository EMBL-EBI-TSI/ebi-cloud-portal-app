import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TeamPresenter } from 'ng2-cloud-portal-presentation-lib';

@Pipe({
    name: 'teamOwnerExclude',
    pure: false
})
@Injectable()
export class TeamOwnerExcludeFilterPipe implements PipeTransform {
    transform(items: TeamPresenter[], excludeImOwner: boolean): TeamPresenter[] {
        return items.filter(item => {
            if (excludeImOwner) {
              return !item.isOwner;
            } else {
              return true;
            }
        });
    }
}

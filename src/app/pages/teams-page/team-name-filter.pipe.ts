import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TeamPresenter } from 'ng2-cloud-portal-presentation-lib';

@Pipe({
    name: 'teamName',
    pure: false
})
@Injectable()
export class TeamNameFilterPipe implements PipeTransform {
    transform(items: TeamPresenter[], searchTerm: string): TeamPresenter[] {
        return items.filter(item => {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        });
    }
}

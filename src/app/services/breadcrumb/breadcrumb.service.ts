import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';

@Injectable()
export class BreadcrumbService {

  public breadcrumb: Breadcrumb[] = [];

  constructor() {

  }
  public getAsUrl(): string {
    return this.breadcrumb.map(b => b.route).join("/");
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {

  private pageSource = new BehaviorSubject('default message');
  currentPage = this.pageSource.asObservable();

  constructor() { }

  changePage(page: string) {
    this.pageSource.next(page)
  }

}

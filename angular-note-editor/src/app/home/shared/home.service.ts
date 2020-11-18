import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  combineLatest as observableCombineLatest,
  Observable,
  from as fromPromise,
  of,
  zip,
} from "rxjs";
import { HelperService } from "../../shared/helper.service";
import { catchError, tap, switchMap } from "rxjs/operators";
import { saveAs } from "file-saver";
import { Tree } from "../../../model/tree.model";
import { AuthenticationService } from "../../auth";
import "rxjs/add/operator/map";
import { MessageService } from "../../messages/message.service";

@Injectable()
export class HomeService {
  text: any;

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  private logError(message: string) {
    this.messageService.addError(message);
  }

  private logSuccess(message: string) {
    this.messageService.add(message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.logError(`${error.statusText}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public get() {
      return this.http.get('https://favqs.com/api/qotd').pipe(
        catchError(this.handleError<any>('get', []))
      );
  }
}

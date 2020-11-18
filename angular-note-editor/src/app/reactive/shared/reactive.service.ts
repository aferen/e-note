import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  combineLatest as observableCombineLatest,
  Observable,
  from as fromPromise,
  of,
} from "rxjs";
import { HelperService } from "../../shared/helper.service";
import { catchError, tap, switchMap } from "rxjs/operators";
import "rxjs/add/operator/map";
import { AuthenticationService } from "../../auth";
import { MessageService } from "../../messages/message.service";

@Injectable()
export class ReactiveService {
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
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.logError(`${error.statusText}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public get(path: string) {
    const url = `file`;
    const requestOptions: Object = {
      responseType: "text",
    };
    return this.http
      .get(this.helperService.getUrl(url), {
        headers: {
          Authorization: "Bearer " + this.authService.currentTokenValue,
        },
        params: { path: path },
        responseType: "text",
      })
      .pipe(
        tap((result) => {
          if (result) {
            return of(result);
          } else {
            //this.messageService.addError(`Found no Product with id=${id}`);
            return of(null);
          }
        }),
        catchError(this.handleError<any>("get", []))
      );
  }

  public update(path: string, text: string) {
    const url = `file`;
    const requestOptions: Object = {
      responseType: "text",
    };
    const dbOperation = this.http.put(this.helperService.getUrl(url), text, {
      headers: {
        Authorization: "Bearer " + this.authService.currentTokenValue,
      },
      params: { path: path },
      responseType: "text",
    });
    return fromPromise(dbOperation);
  }
  public showMessage(message: any, type: boolean) {
    if (type) this.logSuccess(message);
    else this.logError(message);
  }
}

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

@Injectable()
export class DialogService {
  text: any;

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private authService: AuthenticationService
  ) {}

  public createFolder(field: string) {
    const url = `file/createFolder`;

    var data = {
      folderName: field,
    };
    const dbOperation = this.http.post(this.helperService.getUrl(url), data, {
      headers: {
        Authorization: "Bearer " + this.authService.currentTokenValue,
      },
    });

    return fromPromise(dbOperation);
  }

  public deleteFolder(field: string) {
    const url = `file/deleteFolder`;

    var data = {
      folderName: field,
    };
    const dbOperation = this.http.post(this.helperService.getUrl(url), data, {
      headers: {
        Authorization: "Bearer " + this.authService.currentTokenValue,
      },
    });

    return fromPromise(dbOperation);
  }

  public createFile(field: string) {
    const url = `file`;

    var data = {
      path: field,
    };
    const dbOperation = this.http.post(this.helperService.getUrl(url), data, {
      headers: {
        Authorization: "Bearer " + this.authService.currentTokenValue,
      },
    });

    return fromPromise(dbOperation);
  }

  public deleteFile(field: string) {
    const url = `file/deleteFile`;

    var data = {
      path: field,
    };
    const dbOperation = this.http.post(this.helperService.getUrl(url), data, {
      headers: {
        Authorization: "Bearer " + this.authService.currentTokenValue,
      },
    });

    return fromPromise(dbOperation);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable,  of} from "rxjs";
import { map } from "rxjs/operators";
import { HelperService } from "../shared/helper.service";


@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;
  constructor(private http: HttpClient, private helperService: HelperService
    ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentTokenSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentToken"))
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): any {
    return this.currentTokenSubject.value;
  }



  login(username: string, password: string) {
    return this.http
      .post<any>(this.helperService.getUrl("auth/login"), {
        username,
        password,
      })
      .pipe(
        map((data) => {
          // login successful if there's a jwt token in the response
          if (data.user && data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            localStorage.setItem("currentToken", JSON.stringify(data.token));
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            this.currentUserSubject.next(data.user);
            this.currentTokenSubject.next(data.token);
          }
          return data;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentToken");
    this.currentUserSubject.next(null);
    this.currentTokenSubject.next(null);
  }
}

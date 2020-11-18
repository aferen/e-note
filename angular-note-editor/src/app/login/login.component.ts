import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService } from "../auth";
import { first } from "rxjs/operators";
import * as $ from "jquery";
import { Subscription, of, Observable } from "rxjs";
import { AppService } from "../shared/app.service";
import { MessageService } from "../messages/message.service";
import { catchError, tap, switchMap } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private authSubscription: Subscription;
  returnUrl: string;
  user: any;
  page: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.appService.changePage("login");
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.authSubscription = this.authenticationService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }
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
  login(username, password) {
    this.authenticationService
      .login(username, password)
      .pipe(first())
      .subscribe(
        (data) => {
         this.logSuccess("Login successful!");
          $("form").fadeOut(500);
          $(".wrapper").addClass("form-success");
        },
        (error) => {
          this.logError(error.error.error)
        }
      );
  }
  goHome() {
    window.open(window.location.origin + this.returnUrl, "_parent");
    //this.appService.changePage("home");

    // this.router.navigate([this.returnUrl]).then(() => {
    //   window.location.reload();
    // });
  }
}

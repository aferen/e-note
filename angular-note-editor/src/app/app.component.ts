import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";
import * as $ from "jquery";
import "smartmenus";
import "smartmenus-bootstrap-4";
import { Subscription } from "rxjs";
import { AuthenticationService } from "./auth";
import { NavbarService } from "./navbar/shared/navbar.service";
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from "./shared/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  // events: any;
  // isCollapsed = true;
  // title = "Angular-Markdown-Editor";
  // directory;
  // unsubscribe$ = new Subject();
  // navigationSubscription;
  // temp;
  private authSubscription: Subscription;
  public user: any;
  directory:any;
  page:any;
  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private appService: AppService,
    public authService: AuthenticationService,
    private route: ActivatedRoute,

  ) {
      this.appService.currentPage.subscribe(page => this.page = page)
  }

  async ngOnInit() {
    this.directory = await this.getData();
    this.authSubscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }



  async getData() {
    return await new Promise((resolve, reject) => {
      this.navbarService.get().subscribe(
        (data) => {
          //console.log(JSON.stringify(data["children"][0].children))
          // this.storage.set("data", data["children"][0].children);
          resolve(data["children"][0].children);
        },
        (err) => console.error(err)
      );
    });
  }
  // initialiseInvites() {
  //   this.ngOnInit();
  // }
}

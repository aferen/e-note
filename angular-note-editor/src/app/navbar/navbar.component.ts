import { Component, OnInit, Inject, Input, AfterViewInit } from "@angular/core";
import { NavbarService } from "./shared/navbar.service";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { DialogComponent } from "../dialog/dialog.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AuthenticationService } from "../auth";
import * as $ from "jquery";
import "smartmenus";
import "smartmenus-bootstrap-4";
import { AppService } from "../shared/app.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit,AfterViewInit {
  directory: any;
  mySubscription: any;

  @Input() directoryTemp: any;
  constructor(
    private navbarService: NavbarService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private dialog: MatDialog,
    public authService: AuthenticationService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  async ngOnInit() {
    //$.SmartMenus.destroy();
    // var $menu = $("#main-menu");
    this.directory = this.directoryTemp;
    //$.SmartMenus.Bootstrap.init();
    // $("#main-menu").on("init", function (e, menu) {
    //   alert("deneme");
    // });
    //$menu.smartmenus("refresh");
  }

  ngAfterViewInit(){
    $.SmartMenus.Bootstrap.init();
  }
  openFile(path: string) {
    this.router.navigate(["/editor"], {
      queryParams: { filename: path.substring(path.indexOf("files") + 6) },
      relativeTo: this.route,
    });
    // this.router.navigate(['editor',path.substring(path.indexOf("files")+6)]);
  }

  createFolder() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "230px",
      data: {
        type: 0,
        title: "Create Folder",
        field: "Folder Name",
        button: "Create",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    });
  }

  deleteFolder() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "230px",
      data: {
        type: 1,
        title: "Delete Folder",
        field: "Folder Name",
        button: "Delete",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate([""]).then(() => {
        window.location.reload();
      });
    });
  }

  createFile() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "230px",
      data: {
        type: 2,
        title: "Create File",
        field: "File Path",
        button: "Create",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate([""]).then(() => {
        window.location.reload();
      });
    });
  }

  deleteFile() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "230px",
      data: {
        type: 3,
        title: "Delete File",
        field: "File Path",
        button: "Delete",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate([""]).then(() => {
        window.location.reload();
      });
    });
  }

  downloadFiles() {
    this.navbarService.download().subscribe((data) => {
      const blob = new Blob([data], {
        type: "application/zip",
      });
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = "NotebookFiles.zip";
      anchor.href = url;
      anchor.click();
      // window.open(url);
    });
  }

  logout(e: Event) {
    this.authService.logout();
    this.appService.changePage("login");
    this.navbarService.logout();
    this.router.navigate(["/login"]);
  }
}

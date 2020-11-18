import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { ReactiveService } from './reactive/shared/reactive.service';
import { NavbarService } from './navbar/shared/navbar.service';
import { HomeService } from './home/shared/home.service';
import { HelperService } from './shared/helper.service';
import { AppService } from './shared/app.service';
import { DialogService } from './dialog/shared/dialog.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';

import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { StorageServiceModule } from "ngx-webstorage-service";
// import our custom module, library created using this article
// https://medium.com/@ngl817/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { ReactiveComponent } from './reactive/reactive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationService } from './auth';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from "./messages/message.service";

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    DialogComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingRoutingModule,
    BrowserModule,
    MatIconModule,
    MatDialogModule,
    StorageServiceModule,
    MatButtonModule,
    MatInputModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          renderer: new MarkedRenderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    ReactiveFormsModule,
    AngularMarkdownEditorModule.forRoot({
      // add any Global Options/Config you might want
      // to avoid passing the same options over and over in each components of your App
      iconlibrary: 'glyph'
    }),
    BrowserAnimationsModule
  ],
  entryComponents: [DialogComponent],
  providers: [
    ReactiveService,
    HelperService,
    AppService,
    NavbarService,
    DialogService,
    AuthenticationService,
    HomeService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

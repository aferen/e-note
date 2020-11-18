import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorInstance, EditorOption } from 'angular-markdown-editor';
import { ReactiveService } from './shared/reactive.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: './reactive.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  unsubscribe$ = new Subject();
  bsEditorInstance: EditorInstance;
  markdownText: string;
  markdownTextTemp: any;
  showEditor = true;
  templateForm: FormGroup;
  editorOptions: EditorOption;
  param: string;
  navigationSubscription;
  infoMessage = '';
  isVisible = false;
  filename: string;
  constructor(
    private fb: FormBuilder,
    private markdownService: MarkdownService,
    private reactiveService : ReactiveService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

  }

  ngOnInit() {
    this.editorOptions = {
      autofocus: true,
      iconlibrary: 'fa',
      savable: true,
      onChange: (e) => e.getContent(),
      onSave: (e) => this.save(e.getContent()),
      onFullscreenExit: (e) => this.hidePreview(e),
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    this.route.queryParams.subscribe(params => {
      this.param = params['filename']
  });
    //this.route.params.subscribe((params: Params) => this.param = params['filename']);
    this.filename = this.param;
    //put the text completely on the left to avoid extra white spaces
    this.reactiveService.get(this.param).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          this.markdownText = `${data}`;
          this.buildForm(this.markdownText);
          this.onFormChanges();

        },
        (err) => console.error(err)
    );

     this.buildForm(this.markdownText);
     this.onFormChanges();
  }
  initialiseInvites() {
    this.ngOnInit();
  }

  buildForm(markdownText) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }

  save(text : any) {
    this.reactiveService.update(this.param,text).subscribe(
      (data) => {
        this.isVisible = true;
        this.reactiveService.showMessage("File was saved.",true)

      },
      (err) => {
        this.reactiveService.showMessage(err.statusText,false);
      });
  }

  /** highlight all code found, needs to be wrapped in timer to work properly */
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview(e) {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.setFullscreen(isFullScreen);
      this.bsEditorInstance.showPreview();
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }

  onFormChanges(): void {
    this.templateForm.valueChanges.subscribe(formData => {
      if (formData) {
        this.markdownText = formData.body;
      }
    });
  }
}

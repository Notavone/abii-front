import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileUploadService} from "./file-upload.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @ViewChild("input") input?: ElementRef<HTMLInputElement>;

  @Input() label: string = "";

  private _fileString?: string;
  @Output("fileStringChange") fileStringChange: EventEmitter<string> = new EventEmitter();

  @Input("fileString")
  set fileString(value: string | undefined) {
    this._fileString = value;
  }

  get fileString() {
    return this._fileString;
  }

  constructor(
    private fileUploadService: FileUploadService,
  ) {
  }

  ngOnInit(): void {
  }

  openFileDialog() {
    this.input?.nativeElement.click();
  }

  async handleFileChange() {
    const file = this.input?.nativeElement.files?.[0];
    if (file) {
      this._fileString = await this.fileUploadService.toBase64(file);
      this.fileStringChange.emit(this._fileString);
    }
  }

  getFileName() {
    return this.input?.nativeElement.files?.[0]?.name;
  }

  clearFile() {
    if (this.input) {
      this.input.nativeElement.value = "";
      this._fileString = undefined;
      this.fileStringChange.emit(this._fileString);
    }
  }
}

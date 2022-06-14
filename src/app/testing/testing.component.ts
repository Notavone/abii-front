import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { BarcodeFormat } from "@zxing/library";

@Component({
  selector: "app-testing",
  templateUrl: "./testing.component.html",
  styleUrls: ["./testing.component.scss"],
})
export class TestingComponent implements OnInit, AfterViewInit {
  scanning: boolean = false;
  enableTorch: boolean = false;
  showPreview: boolean = false;
  @ViewChild("scanner") scanner?: ZXingScannerComponent;

  constructor() {
  }

  ngOnInit(): void {

  }

  _scans: string[] = [];
  get scans() {
    return this._scans;
  }

  set scans(value: string[]) {
    this._scans = value;
  }

  ngAfterViewInit() {
    if (this.scanner) {
      this.scanner.formats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.DATA_MATRIX];
      this.scanner.camerasFound
        .subscribe(console.log);
      this.scanner.scanError
        .subscribe(console.log);
      this.scanner.scanSuccess
        .subscribe((scan) => {
          this.scans = Array.from(new Set([...this.scans, scan]));
        });
      this.scanner.askForPermission();
    }
  }
}

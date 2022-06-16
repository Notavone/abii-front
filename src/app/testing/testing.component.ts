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
      this.scanner.formats = [BarcodeFormat.AZTEC, BarcodeFormat.CODABAR, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX, BarcodeFormat.EAN_8, BarcodeFormat.EAN_13, BarcodeFormat.ITF, BarcodeFormat.MAXICODE, BarcodeFormat.PDF_417, BarcodeFormat.QR_CODE, BarcodeFormat.RSS_14, BarcodeFormat.RSS_EXPANDED, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E, BarcodeFormat.UPC_EAN_EXTENSION];

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

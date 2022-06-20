import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-testing",
  templateUrl: "./testing.component.html",
  styleUrls: ["./testing.component.scss"],
})
export class TestingComponent implements OnInit {
  scanning: boolean = false;
  showPreview: boolean = false;

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

  handeScanSuccess($event: string) {
    this.scans = [...this.scans, $event];
  }
}

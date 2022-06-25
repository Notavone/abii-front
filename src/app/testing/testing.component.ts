import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../features/notifications/notifications.service";

@Component({
  selector: "app-testing",
  templateUrl: "./testing.component.html",
  styleUrls: ["./testing.component.scss"],
})
export class TestingComponent implements OnInit {
  scanning: boolean = false;
  showPreview: boolean = false;

  constructor(
    private notificationService: NotificationsService,
  ) {
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

  testPush() {
    this.notificationService.testPush();
  }
}

import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../dto/user";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnChanges, AfterViewInit {
  @Input() users: User[] = [];
  @Input() columnsToDisplay: string[] = ["name", "email", "client", "activated"]
  @ViewChild(MatSort) sort?: MatSort;
  dataSet: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor() {
  }

  ngAfterViewInit() {
    if (this.sort) this.dataSet.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSet.data = this.users
  }
}

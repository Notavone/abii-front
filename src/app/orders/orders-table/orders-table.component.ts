import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Order} from "../shared/order";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnChanges {
  @Input() orders: Order[] = [];
  dataSet: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  columnsToDisplay = ["id", "client", "total", "lines"];

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSet.data = this.orders;
  }

  set filter(value: string) {
    this.dataSet.filter = value;
  }
}

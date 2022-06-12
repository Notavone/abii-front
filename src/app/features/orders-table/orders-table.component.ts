import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Order} from "../../business/orders/dto/order";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderLine} from "../../business/orders/dto/order-line";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnChanges, AfterViewInit {
  @Input() orders: Order[] = [];
  @Input() columnsToDisplay = ["id", "client", "total", "status", "date", "lines"];
  @ViewChild("paginator") paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  dataSet: MatTableDataSource<Order> = new MatTableDataSource<Order>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSet.data = this.orders.sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1);
  }

  ngAfterViewInit() {
    if (this.sort) this.dataSet.sort = this.sort;
    if (this.paginator) this.dataSet.paginator = this.paginator;
  }

  countProducts(orderLines: OrderLine[]) {
    return orderLines.reduce((total, orderLine) => total + orderLine.quantity, 0);
  }
}

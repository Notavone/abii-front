import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Order} from "../shared/order";
import {MatTableDataSource} from "@angular/material/table";
import {OrderService} from '../shared/order.service';
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../dialog-confirm/dialog-confirm.component";
import {OrderEvent} from "../shared/order-event";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnChanges, AfterViewInit {
  @Input() orders: Order[] = [];
  @Input() columnsToDisplay = ["id", "client", "total", "date", "lines"];
  @Output() orderDeleted = new EventEmitter<OrderEvent>();
  @ViewChild("paginator") paginator?: MatPaginator;
  dataSet: MatTableDataSource<Order> = new MatTableDataSource<Order>();

  constructor(private orderService: OrderService, private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSet.data = this.orders.sort((a, b) => a.date < b.date ? -1 : 1);
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSet.paginator = this.paginator;
  }

  set filter(value: string) {
    this.dataSet.filter = value;
  }

  deleteOrder(order: Order) {
    this.dialog.open(DialogConfirmComponent, {
      data: {
        title: "Supprimer un achat",
        text: "Êtes vous sûr de vouloir supprimer cet achat ?",
        confirm: "Supprimer"
      }
    }).afterClosed()
      .subscribe(result => {
        if (result as unknown as boolean) {
          this.orderService.deleteOrder(order)
            .subscribe(response => {
              this.orderDeleted.emit(response);
            })
        }
      })
  }
}

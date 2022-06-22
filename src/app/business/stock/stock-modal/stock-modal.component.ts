import { AfterViewInit, Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "../../products/dto/product";
import { StockService } from "../stock.service";
import { StockChange } from "../dto/stock-change.entity";
import { User } from "../../users/dto/user";
import { UsersService } from "../../users/users.service";
import { StockQueryDto } from "../dto/stock-query.dto";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-stock-modal",
  templateUrl: "./stock-modal.component.html",
  styleUrls: ["./stock-modal.component.scss"],
})
export class StockModalComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  dataSource = new MatTableDataSource<StockChange>();
  changes: StockChange[] = [];
  users: User[] = [];
  stockQueryDto = new StockQueryDto();
  columnsToDisplay = ["createdAt", "user", "before", "after", "difference"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private stockService: StockService,
    private usersService: UsersService,
  ) {
    this.stockQueryDto.productId = product.id;
  }

  ngOnInit(): void {
    this.stockService.getStockChanges(this.stockQueryDto)
      .subscribe({
        next: (changes) => this.dataSource.data = changes,
      });

    this.usersService.getUsers()
      .subscribe({
        next: (users) => this.users = users,
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

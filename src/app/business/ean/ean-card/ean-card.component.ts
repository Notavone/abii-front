import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { MappedEan } from "../dto/ean.entity";
import { Product } from "../../products/dto/product";

@Component({
  selector: "app-ean-card",
  templateUrl: "./ean-card.component.html",
  styleUrls: ["./ean-card.component.scss"],
})
export class EanCardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input() data: Product | null = null;
  @Input() content: MappedEan[] = [];
  @Output() onDropped = new EventEmitter<CdkDragDrop<Product | null, MappedEan>>();
  @Output() onSettingsOpen = new EventEmitter<MappedEan>();
  @Output() onValueClick = new EventEmitter<MappedEan>();
}

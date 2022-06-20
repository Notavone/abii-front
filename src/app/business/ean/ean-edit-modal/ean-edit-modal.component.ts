import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MappedEan } from "../dto/ean.entity";
import { EanUpdateDto } from "../dto/ean-update.dto";

export enum EanEditModalMode {
  CREATE,
  UPDATE,
  READONLY,
}

export class EanEditModalData {
  constructor(
    public mappedEan: MappedEan,
    public mode: EanEditModalMode = EanEditModalMode.READONLY,
  ) {
  }
}

@Component({
  selector: "app-ean-edit-modal",
  templateUrl: "./ean-edit-modal.component.html",
  styleUrls: ["./ean-edit-modal.component.scss"],
})
export class EanEditModalComponent implements OnInit {
  isLoading: boolean = false;
  eanUpdateDtoOriginal: EanUpdateDto;
  EanEditModalMode = EanEditModalMode;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: EanEditModalData,
  ) {
    this.eanUpdateDtoOriginal = { ...modalData.mappedEan.dto };
  }

  ngOnInit(): void {
  }

  get dtoHasChanged() {
    return JSON.stringify(this.eanUpdateDtoOriginal) !== JSON.stringify(this.modalData.mappedEan?.dto);
  }
}

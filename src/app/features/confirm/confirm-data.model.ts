import {ThemePalette} from "@angular/material/core";

export class ConfirmDataModel {
  public title?: string;
  public message?: string;
  public confirmButtonText?: string;
  public cancelButtonText?: string;
  public confirmButtonColor?: ThemePalette;
  public cancelButtonColor?: ThemePalette;
  public onConfirm?: () => void;
  public onCancel?: () => void;
}

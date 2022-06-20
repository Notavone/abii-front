import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EanComponent } from './ean.component';

const routes: Routes = [{ path: '', component: EanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EanRoutingModule { }

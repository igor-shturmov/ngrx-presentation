import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailsPageComponent } from './pages/book-details-page/book-details-page.component';

const routes: Routes = [{
  path: '',
  component: BookDetailsPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookDetailsRoutingModule { }

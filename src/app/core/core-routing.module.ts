import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorePageComponent } from './pages/core-page/core-page.component';

const routes: Routes = [{
  path: '',
  component: CorePageComponent,
  children: [{
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }, {
    path: 'list',
    loadChildren: () => import('./features/books-list/books-list.module')
      .then(m => m.BooksListModule)
  }, {
    path: ':id',
    loadChildren: () => import('./features/book-details/book-details.module')
      .then(m => m.BookDetailsModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}

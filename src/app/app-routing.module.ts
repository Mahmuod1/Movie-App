import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { MylistComponent } from './components/mylist/mylist.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'watch',
    children: [
      { path: ':media_type/:id', component: DetailsComponent }
    ]
  },
  { path: 'mylist', component: MylistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './homes/detail/detail.component';
import { HomeMainComponent } from './homes/home-main/home-main.component';

const routes: Routes = [
    { path: '', component: HomeMainComponent },
    { path: ':path', component: DetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

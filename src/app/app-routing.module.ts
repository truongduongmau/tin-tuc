import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './homes/detail/detail.component';
import { HomeMainComponent } from './homes/home-main/home-main.component';
import { env } from 'src/env/env';

const routes: Routes = [
    { path: '', component: HomeMainComponent },
    { path: `${env.PATH}:path`, component: DetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

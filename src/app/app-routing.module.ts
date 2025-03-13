import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailComponent } from './news/detail/detail.component';
import { NewsComponent } from './news/main/main.component';

const routes: Routes = [
    { path: '', component: NewsComponent },
    { path: `news/:path`, component: NewsDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

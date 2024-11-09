import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeMainComponent } from './homes/home-main/home-main.component';
import { HttpService } from './homes/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './homes/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeMainComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

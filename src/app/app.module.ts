import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeMainComponent } from './homes/home-main/home-main.component';
import { HttpService } from './homes/services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './homes/detail/detail.component';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    HomeMainComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule
  ],
  providers: [
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

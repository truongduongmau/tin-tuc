import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/main/main.component';
import { HttpService } from './news/services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewsDetailComponent } from './news/detail/detail.component';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsDetailComponent
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

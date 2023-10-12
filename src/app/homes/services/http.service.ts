import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getContents(page: number) {
    return this.http.get(`${env.apiURL}/doc-nhanh/trang-${page}.chn`, {responseType: "text"});
  }
}

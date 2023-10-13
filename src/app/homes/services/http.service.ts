import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/env/env';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    getContents(page: number) {
        const salt = (new Date()).getTime();
        return this.http.get(`${env.apiURL}/doc-nhanh/trang-${page}.chn?${salt}`, {
            responseType: "text", headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    }
}

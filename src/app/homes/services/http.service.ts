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
            responseType: "text", 
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
    }
}

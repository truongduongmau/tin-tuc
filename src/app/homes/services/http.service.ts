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
        let url = env.apiURL;
        url = "https://api.allorigins.win/raw?url=https://cafef.vn"
        return this.http.get(`${url}/doc-nhanh/trang-${page}.chn?${salt}`, {
            responseType: "text", headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        });
    }
}

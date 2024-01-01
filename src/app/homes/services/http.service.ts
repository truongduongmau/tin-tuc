import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/env/env';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    getContents(apiUrl: string, page: number) {
        const salt = (new Date()).getTime();
        return this.http.get(`${apiUrl}/doc-nhanh/trang-${page}.chn?${salt}`, {
            responseType: "text", 
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        });
    }
}

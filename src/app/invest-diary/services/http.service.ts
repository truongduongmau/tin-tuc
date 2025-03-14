import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/env/env';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    baseUrl = 'https://api.telegram.org/bot7797871187:AAGx_g1VOYi3OcZwaqoCg27-l5mV-v8Ejhk';

    constructor(private http: HttpClient) { }

    getLatest() {
        return this.http.get(`${this.baseUrl}/getUpdates`, {
            params: { offset: -1 }
        });
    }

    getUpdates(offset: number, limit: number = 20) {
        return this.http.get(`${this.baseUrl}/getUpdates`, {
            params: { offset, limit }
        });
    }
}

import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpService } from '../services/http.service';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { Subject } from 'rxjs/internal/Subject';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { env } from 'src/env/env';

@Component({
    selector: 'app-invest-diary',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class InvestDiaryComponent implements OnInit, AfterViewInit {
    page: number = 1;
    isLoading: boolean = false;
    fastnews_main: any;
    callApi$: Subject<string> = new Subject();
    hostIndex: number = 0;
    hosts = [
        'https://cors-cafef.onrender.com/https://cafef.vn',
        'https://api.allorigins.win/raw?url=https://cafef.vn',
        'https://thingproxy.freeboard.io/fetch/https://cafef.vn',
        'https://cors-anywhere.herokuapp.com/http://103.179.190.146:8080/https://cafef.vn',
    ]

    constructor(private httpService: HttpService, private readonly renderer: Renderer2, private router: Router) { }

    ngOnInit(): void {
        this.callApi$
            .pipe(
                exhaustMap((apiUrl) => this.httpService.getContents(apiUrl, this.page)),
                catchError(() => {
                    this.hostIndex++;
                    return this.httpService.getContents(this.hosts[this.hostIndex], this.page);
                }),
            )
            .subscribe(
                (data: any) => {
                    this.getDataSuccess(data);
                },
                () => {
                    this.isLoading = false;
                }
            );
    }

    ngAfterViewInit() {
        this.fastnews_main = document.getElementById("fastnews-main-contents") as Element;
        this.getData()
    }

    getData() {
        this.isLoading = true;
        this.hostIndex = 0;
        this.getContents(this.hosts[this.hostIndex])
    }

    getDataSuccess(data: string) {
        this.page += 1;
        this.isLoading = false;
        let dom_document = new DOMParser().parseFromString(data, "text/html");
        const news = dom_document.querySelectorAll("div.list-fast-news > .item");
        if (news.length) {
            news.forEach((item) => {
                let timeTitle = item.querySelector("div.timeTitle")
                const time = item.querySelector("span.time");
                const timeText = (time?.innerHTML || "").replace("(", "").replace(")", "");
                timeTitle?.replaceChildren(timeText);

                let title = item.querySelector(".title-wrap > a")
                title?.setAttribute('target', '_blank')

                const href = title?.getAttribute("href")
                const path = window.btoa(`${this.hosts[this.hostIndex]}${href}`)
                const sourceUrl = window.btoa("https://cafef.vn" + href)
                title?.setAttribute("href", `#/news/${path}?sourceUrl=${sourceUrl}`)

                this.fastnews_main?.append(item)
            })
        } else {
            this.hostIndex++;
            if (this.hosts[this.hostIndex]) {
                this.getContents(this.hosts[this.hostIndex])
            }
        }
    }

    ngOnDestroy(): void {
        this.callApi$.unsubscribe()
    }

    getContents(apiUrl: string) {
        this.httpService.getContents(apiUrl, this.page).subscribe(
            (data: any) => {
                this.getDataSuccess(data);
            },
            () => {
                if (apiUrl.indexOf('https://cors-anywhere.herokuapp.com') == 0) window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
                this.hostIndex++;
                if (this.hosts[this.hostIndex]) {
                    this.getContents(this.hosts[this.hostIndex])
                }
            }
        )
    }
}

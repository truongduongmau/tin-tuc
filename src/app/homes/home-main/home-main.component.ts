import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { Subject } from 'rxjs/internal/Subject';
import { catchError, finalize, mergeMap, retryWhen, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-home-main',
    templateUrl: './home-main.component.html',
    styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit, AfterViewInit {
    page: number = 1;
    isLoading: boolean = false;
    fastnews_main: any;
    callApi$: Subject<string> = new Subject();
    hostIndex: number = 0;
    hosts = [
        'https://api.allorigins.win/raw?url=https://cafef.vn',
        'https://thingproxy.freeboard.io/fetch/https://cafef.vn',
        'https://cors-anywhere.herokuapp.com/http://103.179.190.146:8080/https://cafef.vn',
    ]

    constructor(private httpService: HttpService) { }

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
        //this.callApi$.next(this.hosts[this.hostIndex]);
        this.getContents(this.hosts[this.hostIndex])
    }

    getDataSuccess(data: string) {
        this.page += 1;
        this.isLoading = false;
        let dom_document = new DOMParser().parseFromString(data, "text/html");
        const news = dom_document.querySelectorAll("div.list-fast-news > .item");

        news.forEach((item) => {
            let timeTitle = item.querySelector("div.timeTitle")
            const time = item.querySelector("span.time");
            const timeText = (time?.innerHTML || "").replace("(", "").replace(")", "");
            timeTitle?.replaceChildren(timeText);

            let title = item.querySelector(".title-wrap > a")
            const href = title?.getAttribute("href")
            title?.setAttribute("href", "https://cafef.vn" + href)
            this.fastnews_main?.append(item)
        })
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
                this.hostIndex++;
                if (this.hosts[this.hostIndex]) {
                    this.getContents(this.hosts[this.hostIndex])
                }
            }
        )
    }
}

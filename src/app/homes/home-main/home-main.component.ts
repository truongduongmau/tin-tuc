import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { Subject } from 'rxjs/internal/Subject';

@Component({
    selector: 'app-home-main',
    templateUrl: './home-main.component.html',
    styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit, AfterViewInit {
    page: number = 1;
    isLoading: boolean = false;
    fastnews_main: any;
    callApi$: Subject<boolean> = new Subject();

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.callApi$.pipe(exhaustMap(() => this.httpService.getContents(this.page)))
            .subscribe(
                (data: any) => {
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
                },
                () => {
                    this.isLoading = false;
                });
    }

    ngAfterViewInit() {
        this.fastnews_main = document.getElementById("fastnews-main-contents") as Element;
        this.getData()
    }

    getData() {
        this.isLoading = true;
        this.callApi$.next(true);
    }

    ngOnDestroy(): void {
        this.callApi$.unsubscribe()
    }
}

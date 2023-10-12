import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
    selector: 'app-home-main',
    templateUrl: './home-main.component.html',
    styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
    fastnews_main: string = "";
    page: number = 0;
    isLoading: boolean = false;

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.getData()
    }

    getData() {
        this.page += 1;
        this.isLoading = true;
        this.httpService.getContents(this.page)
            .subscribe((data: any) => {
                let fastnews_main = document.getElementById("fastnews-main-contents")
                let dom_document = new DOMParser().parseFromString(data, "text/html");
                let news = dom_document.querySelectorAll("div.list-fast-news > .item");
                news.forEach((item) => {
                    let timeTitle = item.querySelector("div.timeTitle")
                    let title = item.querySelector(".title-wrap > a")
                    const time = item.querySelector("span.time");
                    const timeText = (time?.innerHTML || "").replace("(", "").replace(")", "");
                    timeTitle?.replaceChildren(timeText);
                    const href = title?.getAttribute("href")
                    title?.setAttribute("href", "https://cafef.vn" + href)
                    fastnews_main?.append(item)
                })
            },
            () => {},
            () => {
                this.isLoading = false;
            });
    }
}

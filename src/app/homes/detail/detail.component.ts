import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, AfterViewInit {
    ngUnsubscribe = new Subject<void>();

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute,
        private readonly renderer: Renderer2
    ) { }

    ngOnInit(): void {
        const path = window.atob(this.route.snapshot.paramMap.get('path') || "");
        this.httpService.getDetail(path).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
            this.getDetailSuccess(data);
        })
    }

    ngAfterViewInit() {
    }

    getDetailSuccess(data: string) {
        const dom_document = new DOMParser().parseFromString(data, "text/html");
        const content = dom_document.querySelector("div.totalcontentdetail");

        if (content) {
            const mainContentDetail = document.getElementById("main-content-detail") as Element;
            mainContentDetail?.appendChild(content)
        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.unsubscribe()
    }
}

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
    sourceUrl = ''

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute,
        private readonly renderer: Renderer2
    ) { }

    ngOnInit(): void {
        const path = window.atob(this.route.snapshot.paramMap.get('path') || "");
        this.sourceUrl = window.atob(this.route.snapshot.queryParamMap.get("sourceUrl") || "");
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

            const title = content.querySelector("h1.title")
            if (title) mainContentDetail?.append(title)

            const topshare = content.querySelector("div.topshare")
            if (topshare) {

                const social = content.querySelector("div.social-r")
                const source = document.createElement("a");
                source.appendChild(document.createTextNode("Nguồn"));
                source.setAttribute('href', this.sourceUrl)
                source.setAttribute('target', '_blank')

                if (social) social?.replaceChildren(source);

                mainContentDetail?.append(topshare)
            }

            const sapo = content.querySelector("h2.sapo")
            if (sapo) mainContentDetail?.append(sapo)

            const contentdetail = content.querySelector("div.contentdetail")
            if (contentdetail) {
                const link_content_footer = content.querySelector("div.link-content-footer")
                if (link_content_footer) link_content_footer?.replaceChildren("");

                mainContentDetail?.append(contentdetail)
            }

            const content_source = content.querySelector("div.content_source")
            if (content_source) mainContentDetail?.append(content_source)

        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.unsubscribe()
    }
}

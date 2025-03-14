import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpService } from '../services/http.service';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { Subject } from 'rxjs/internal/Subject';
import { catchError, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { env } from 'src/env/env';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-invest-diary',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class InvestDiaryComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;
    offset: number = 0;
    limit: number = 20;
    fastnews_main: any;
    destroy$ = new Subject<void>();

    constructor(private httpService: HttpService, private readonly renderer: Renderer2, private router: Router) { }

    ngOnInit(): void {
        /* this.httpService.getLatest().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            if (data?.result && data.result.length) {
                this.offset = data.result[0].update_id - this.limit
                this.getUpdates()
            }
        }) */
    }

    ngAfterViewInit() {
        this.fastnews_main = document.getElementById("fastnews-main-contents") as Element;
        this.getUpdates()
    }

    getUpdates() {
        this.isLoading = true;
        this.httpService.getUpdates(this.offset, this.limit).pipe(
            takeUntil(this.destroy$)
        ).subscribe((data: any) => {
            if (data?.result && data.result.length) {
                this.offset = data.result[0].update_id - this.limit
                this.renderHTML(data.result.reverse())
            }
            this.isLoading = false;
        })
    }

    renderHTML(result: any[]) {
        result.forEach((item) => {
            const post = item.channel_post
            const parentHtml = this.renderer.createElement('div');
            this.renderer.addClass(parentHtml, "item");

            const headerHtml = this.renderer.createElement('h3');
            this.renderer.setProperty(headerHtml, 'innerHTML', formatDate(post.date * 1000, 'dd/MM/yyyy HH:mm', 'en-US'));

            const contentHtml = this.renderer.createElement('pre');
            this.renderer.addClass(contentHtml, "nv-details");
            this.renderer.setProperty(contentHtml, 'innerHTML', post.text);

            this.renderer.appendChild(parentHtml, headerHtml);
            this.renderer.appendChild(parentHtml, contentHtml);
            this.renderer.appendChild(this.fastnews_main, parentHtml);
        });

    }


    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

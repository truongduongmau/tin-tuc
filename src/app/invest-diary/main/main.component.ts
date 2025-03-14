import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpService } from '../services/http.service';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { Subject } from 'rxjs/internal/Subject';
import { catchError, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { env } from 'src/env/env';

@Component({
    selector: 'app-invest-diary',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class InvestDiaryComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;
    offset: number = 0;
    limit: number = 20;
    data: any[] = [];
    destroy$ = new Subject<void>();

    constructor(private httpService: HttpService, private readonly renderer: Renderer2, private router: Router) { }

    ngOnInit(): void {
        this.httpService.getLatest().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            if (data?.result && data.result.length) {
                this.offset = data.result[0].update_id - this.limit
                this.getUpdates()
            }
        })
    }

    ngAfterViewInit() {
    }

    getUpdates() {
        this.isLoading = true;
        this.httpService.getUpdates(this.offset, this.limit).pipe(
            takeUntil(this.destroy$)
        ).subscribe((data: any) => {
            if (data?.result && data.result.length) {
                this.offset = data.result[0].update_id - this.limit
                this.data = data.result.reverse()
            }
            this.isLoading = false;
        })
    }


    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { Page } from 'src/app/interfaces/page.interface';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
    @Input() items$!: Observable<any[]>;
    @Output() pageChange = new EventEmitter<any[]>();

    pages$!: Observable<Page<any>[]>;

    itemsPerPage: number = environment.itemsPerPage;
    currentPageNumber: number | null = null;
    maxPageNumber: number | null = null;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.initializeCurrentPageNumber();
        this.initializePages();
        this.items$.subscribe(() => this.onPageChange());
    }

    initializeCurrentPageNumber() {
        let currentPageNumber = this.route.snapshot.queryParamMap.get('page');
        if (!currentPageNumber) {
            currentPageNumber = '1';
        }

        this.setCurrentPageNumber(+currentPageNumber);
    }

    initializePages() {
        this.pages$ = this.items$.pipe(map((items) => this.getPages(items)));
    }

    onPageChange() {
        this.pages$
            .pipe(
                take(1),
                tap((pages) => (this.maxPageNumber = pages.length)),
                map((pages) => pages[this.currentPageNumber! - 1])
            )
            .subscribe((page) => this.pageChange.emit(page.items));
    }

    getPages(items: any[]) {
        const pages: Page<any>[] = [];

        if (items.length === 0) {
            pages.push({ number: 1, items: [] });
            return pages;
        }

        let i = 0;
        while (items.length > 0) {
            const currentPageItems = items.splice(0, this.itemsPerPage);
            pages.push({ number: i + 1, items: currentPageItems });
            i++;
        }

        return pages;
    }

    nextPage() {
        this.setCurrentPageNumber(this.currentPageNumber! + 1);
        this.onPageChange();
    }

    previousPage() {
        this.setCurrentPageNumber(this.currentPageNumber! - 1);
        this.onPageChange();
    }

    setCurrentPageNumber(pageNumber: number) {
        this.currentPageNumber = pageNumber;
        this.router.navigate([], { queryParams: { page: pageNumber } });
    }
}

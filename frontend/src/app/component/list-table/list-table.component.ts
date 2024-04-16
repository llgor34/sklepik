import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { NumeratedIdx } from 'src/app/interfaces/numerated.interface';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { NumeratePipe } from 'src/app/pipes/numerate.pipe';

@Component({
    selector: 'app-list-table',
    templateUrl: './list-table.component.html',
    styleUrls: ['./list-table.component.css'],
    providers: [FilterPipe, NumeratePipe],
})
export class ListTableComponent<T> implements OnInit {
    @Output() addNew = new EventEmitter<void>();

    @Input() title!: string;
    @Input() observable$!: Observable<T[]>;
    @Input() tableBodyTemplate!: TemplateRef<TableBodyContext<T[]>>;
    @Input() tableHeadTemplate!: TemplateRef<null>;

    searchValue$ = new BehaviorSubject('');
    records$!: Observable<(T & NumeratedIdx)[]>;
    records: (T & NumeratedIdx)[] = [];

    constructor(private numeratePipe: NumeratePipe, private filterPipe: FilterPipe) {}

    ngOnInit() {
        this.records$ = combineLatest([this.observable$, this.searchValue$]).pipe(
            map(([records, searchValue]) => this.filterPipe.transform(records, searchValue)!),
            map((records) =>
                this.numeratePipe.transform(records).map((record) => ({ ...record.value, idx: record.idx }))
            )
        );
    }

    onAddNew() {
        this.addNew.emit();
    }

    onPageChange(records: (T & NumeratedIdx)[]) {
        this.records = records;
    }
}

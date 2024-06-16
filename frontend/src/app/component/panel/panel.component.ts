import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, shareReplay, switchMap } from 'rxjs';
import { CreateFn } from 'src/app/interfaces/create-fn.interface';
import { DeleteFn } from 'src/app/interfaces/delete-fn.interface';
import { GetFn } from 'src/app/interfaces/get-fn.interface';
import { Id } from 'src/app/interfaces/id.interface';
import { NumeratedIdx } from 'src/app/interfaces/numerated.interface';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { UpdateFn } from 'src/app/interfaces/update-fn.interface';
import { NewRecordService } from 'src/app/services/new-record.service';
import { PanelService } from 'src/app/services/panel.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css'],
})
export class PanelComponent<T extends Id> implements OnInit {
    private subscription = new Subscription();
    private refreshItems$ = new BehaviorSubject(null);

    private getFn$!: GetFn<T>;
    private updateFn$!: UpdateFn;
    private deleteFn$!: DeleteFn;
    private createFn$!: CreateFn;

    toastService: ToastService = inject(ToastService);
    newRecordService: NewRecordService<T> = inject(NewRecordService);
    panelService: PanelService<T> = inject(PanelService);

    observable$!: Observable<T[]>;
    observableContext!: TableBodyContext<(T & NumeratedIdx)[]>;

    ngOnInit(): void {
        console.log('RUNNED');
        this.initializeComponent(
            this.panelService.getRecords$,
            this.panelService.updateRecord$,
            this.panelService.deleteRecord$,
            this.panelService.createRecord$
        );
    }

    onCreateItem(item: T) {
        this.createFn$(item).subscribe((id) => {
            this.refreshItems();
            this.showCreateSuccess(id);
        });
    }

    onDeleteItem(id: number) {
        this.deleteFn$(id).subscribe(() => {
            this.refreshItems();
            this.showDeleteSuccess(id);
        });
    }

    onFieldChange(item: T & NumeratedIdx, obj: Partial<T>) {
        const key: string = Object.keys(obj)[0];

        this.updateFn$(item.id!, { [key]: (obj as any)[key] }).subscribe(() => {
            this.refreshItems();
            this.showUpdateSuccess(item.id!);
        });
    }

    onAddNewEmptyRecord(): void {
        this.newRecordService.addRecord(this.getEmptyRecord());
    }

    getEmptyRecord(): T {
        return null as unknown as T;
    }

    refreshItems() {
        this.refreshItems$.next(null);
    }

    showUpdateSuccess(id: number) {
        this.toastService.showSuccess(`Pomyślnie zaktualizowano element o id: ${id}`);
    }

    showDeleteSuccess(id: number) {
        this.toastService.showSuccess(`Pomyślnie usunięto element o id: ${id}`);
    }

    showCreateSuccess(id: number) {
        this.toastService.showSuccess(`Pomyślnie dodano nowy element o id ${id}`);
    }

    trackByFn(index: number, item: T) {
        return item.id;
    }

    protected initializeComponent(
        getFn$: GetFn<T>,
        updateFn$: UpdateFn,
        deleteFn$: DeleteFn,
        createFn$: CreateFn
    ): void {
        this.bindHttpFunctions(updateFn$, deleteFn$, getFn$, createFn$);
        this.createRefreshObservable();
        this.listenForRecordSubmitEvent();
    }

    private createRefreshObservable(): void {
        this.observable$ = this.refreshItems$.pipe(
            switchMap(() => this.getFn$()),
            shareReplay(1)
        );
    }

    private bindHttpFunctions(updateFn$: UpdateFn, deleteFn$: DeleteFn, getFn$: GetFn<T>, createFn$: CreateFn): void {
        this.bindUpdateFn(updateFn$);
        this.bindDeleteFn(deleteFn$);
        this.bindGetFn(getFn$);
        this.bindCreateFn(createFn$);
    }

    private bindUpdateFn(updateFn$: UpdateFn) {
        this.updateFn$ = updateFn$;
    }

    private bindDeleteFn(deleteFn$: DeleteFn) {
        this.deleteFn$ = deleteFn$;
    }

    private bindGetFn(getFn$: GetFn<T>) {
        this.getFn$ = getFn$;
    }

    private bindCreateFn(createFn$: CreateFn) {
        this.createFn$ = createFn$;
    }

    private listenForRecordSubmitEvent(): void {
        this.subscription.add(this.newRecordService.onRecordCreate$.subscribe((record) => this.onCreateItem(record)));
    }
}

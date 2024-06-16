import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, shareReplay, switchMap } from 'rxjs';
import { CreateFn } from 'src/app/interfaces/create-fn.interface';
import { DeleteFn } from 'src/app/interfaces/delete-fn.interface';
import { GetFn } from 'src/app/interfaces/get-fn.interface';
import { Id } from 'src/app/interfaces/id.interface';
import { NumeratedIdx } from 'src/app/interfaces/numerated.interface';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { UpdateFn } from 'src/app/interfaces/update-fn.interface';
import { NewRecordService } from 'src/app/services/new-record.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css'],
})
export class PanelComponent<T extends Id> {
    private subscription = new Subscription();
    private refreshItems$ = new BehaviorSubject(null);

    private updateFn$!: UpdateFn;
    private deleteFn$!: DeleteFn;
    private getFn$!: GetFn<T>;
    private createFn$!: CreateFn<T>;

    toastService: ToastService = inject(ToastService);
    newRecordService: NewRecordService<T> = inject(NewRecordService);

    observable$!: Observable<T[]>;
    observableContext!: TableBodyContext<(T & NumeratedIdx)[]>;

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
        createFn$: CreateFn<T>
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

    private bindHttpFunctions(
        updateFn$: UpdateFn,
        deleteFn$: DeleteFn,
        getFn$: GetFn<T>,
        createFn$: CreateFn<T>
    ): void {
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

    private bindCreateFn(createFn$: CreateFn<T>) {
        this.createFn$ = createFn$;
    }

    private listenForRecordSubmitEvent(): void {
        this.subscription.add(this.newRecordService.onRecordCreate$.subscribe((record) => this.onCreateItem(record)));
    }
}

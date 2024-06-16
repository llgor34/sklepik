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
    toastService: ToastService = inject(ToastService);
    newRecordService: NewRecordService<T> = inject(NewRecordService);
    panelService: PanelService<T> = inject(PanelService);

    observable$!: Observable<T[]>;
    observableContext!: TableBodyContext<(T & NumeratedIdx)[]>;

    private subscription = new Subscription();
    private refreshItems$ = new BehaviorSubject(null);

    onTableHeaderSort(columnKey: string): void {
        if (this.panelService.getOrderBy() === columnKey) {
            this.panelService.toggleOrderType();
        }
        this.panelService.setOrderBy(columnKey);
        this.refreshItems();
    }

    onCreateItem(item: T) {
        this.panelService.createRecord$(item).subscribe((id) => {
            this.refreshItems();
            this.showCreateSuccess(id);
        });
    }

    onDeleteItem(id: number) {
        this.panelService.deleteRecord$(id).subscribe(() => {
            this.refreshItems();
            this.showDeleteSuccess(id);
        });
    }

    onFieldChange(item: T & NumeratedIdx, obj: Partial<T>) {
        const key: string = Object.keys(obj)[0];

        this.panelService.updateRecord$(item.id!, { [key]: (obj as any)[key] }).subscribe(() => {
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

    ngOnInit(): void {
        this.createRefreshObservable();
        this.listenForRecordSubmitEvent();
    }

    private createRefreshObservable(): void {
        this.observable$ = this.refreshItems$.pipe(
            switchMap(() => this.panelService.getRecords$()),
            shareReplay(1)
        );
    }

    private listenForRecordSubmitEvent(): void {
        this.subscription.add(this.newRecordService.onRecordCreate$.subscribe((record) => this.onCreateItem(record)));
    }
}

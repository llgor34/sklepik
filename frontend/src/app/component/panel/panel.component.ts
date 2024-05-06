import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { CreateFn } from 'src/app/interfaces/create-fn.interface';
import { DeleteFn } from 'src/app/interfaces/delete-fn.interface';
import { Id } from 'src/app/interfaces/id.interface';
import { NumeratedIdx } from 'src/app/interfaces/numerated.interface';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { UpdateFn, updateObj } from 'src/app/interfaces/update-fn.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css'],
})
export class PanelComponent<T extends Id> {
    toastService: ToastService = inject(ToastService);

    observable$!: Observable<T[]>;
    observableContext!: TableBodyContext<(T & NumeratedIdx)[]>;
    refreshProducts$ = new BehaviorSubject(null);

    updateFn$!: UpdateFn;
    deleteFn$!: DeleteFn;
    createFn$!: CreateFn<T>;

    initializeComponent(
        observable$: Observable<T[]>,
        updateFn$: UpdateFn,
        deleteFn$: DeleteFn,
        createFn$: CreateFn<T>
    ): void {
        this.observable$ = this.refreshProducts$.pipe(
            switchMap(() => observable$),
            shareReplay(1)
        );
        this.updateFn$ = updateFn$;
        this.deleteFn$ = deleteFn$;
        this.createFn$ = createFn$;
    }

    onFieldChange(item: T & NumeratedIdx, obj: Partial<T>) {
        const key: string = Object.keys(obj)[0];

        this.updateFn$(item.id!, { [key]: (obj as any)[key] }).subscribe(() => {
            this.refreshProducts();
            this.showUpdateSuccess(item.id!);
        });
    }

    onDeleteItem(id: number) {
        this.deleteFn$(id).subscribe(() => {
            this.refreshProducts();
            this.showDeleteSuccess(id);
        });
    }

    onCreateItem(item: T) {
        this.createFn$(item).subscribe((id) => {
            this.refreshProducts();
            this.showCreateSuccess(id);
        });
    }

    refreshProducts() {
        this.refreshProducts$.next(null);
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
}

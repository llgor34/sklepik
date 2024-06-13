import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SellmentClosePreviewData } from 'src/app/interfaces/sellment-close-preview-data.interface';
import { SellmentCloseRaport } from 'src/app/interfaces/sellment-close-product.interface';
import { FileService } from 'src/app/services/file.service';
import { SellmentCloseRaportService } from 'src/app/services/sellment-close-raport.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-sellment-close-raport',
    templateUrl: './sellment-close-raport.component.html',
    styleUrls: ['./sellment-close-raport.component.css'],
})
export class SellmentCloseRaportComponent implements OnInit, OnDestroy {
    raportIdControl = new FormControl<number | null>(null);

    raportsPreviewData$: Observable<SellmentClosePreviewData[]> =
        this.sellmentCloseRaportService.getAllRaportPreviewData$();
    raportPreview$!: Observable<SellmentCloseRaport>;
    generateRaport$!: Observable<Blob>;

    isLoading = false;
    isRaportGenerated = false;

    subscription = new Subscription();

    constructor(
        private sellmentCloseRaportService: SellmentCloseRaportService,
        private fileService: FileService,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.updateRaport();
        this.subscription.add(this.raportIdControl.valueChanges.subscribe(() => this.updateRaport()));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    downloadRaport: (() => void) | null = null;

    generateRaport(): void {
        this.startLoading();

        this.generateRaport$.subscribe({
            next: (file: Blob) => {
                this.finishLoading();
                this.setRaportGeneratedToTrue();
                this.downloadRaport = this.fileService.prepareFileForDownload(file);
                this.downloadRaport();
            },
            error: (res) => {
                this.finishLoading();
                this.setRaportGeneratedToFalse();
                this.showRaportGenerationErrorMessage();
            },
        });
    }

    private updateRaport(): void {
        this.resetGeneratedRaport();
        this.updateGenerateRaport();
        this.updateRaportPreview();
    }

    private updateRaportPreview(): void {
        this.raportPreview$ = this.getRaportPreviewFactory();
    }

    private updateGenerateRaport(): void {
        this.generateRaport$ = this.generateRaportFactory();
    }

    private resetGeneratedRaport(): void {
        this.isRaportGenerated = false;
        this.downloadRaport = null;
    }

    private generateRaportFactory(): Observable<Blob> {
        return this.raportIdControl.value
            ? this.generateRaportById(this.raportIdControl.value)
            : this.generateRaportLatest();
    }

    private getRaportPreviewFactory(): Observable<SellmentCloseRaport> {
        return this.raportIdControl.value
            ? this.getRaportPreviewById(this.raportIdControl.value)
            : this.getRaportPreviewLatest();
    }

    private generateRaportLatest(): Observable<Blob> {
        return this.sellmentCloseRaportService.generateRaportLatest$();
    }

    private generateRaportById(id: number): Observable<Blob> {
        return this.sellmentCloseRaportService.generateRaportById$(id);
    }

    private getRaportPreviewLatest(): Observable<SellmentCloseRaport> {
        return this.sellmentCloseRaportService.getRaportPreviewLatest$();
    }

    private getRaportPreviewById(id: number): Observable<SellmentCloseRaport> {
        return this.sellmentCloseRaportService.getRaportPreviewById$(id);
    }

    private startLoading(): void {
        this.isLoading = true;
    }

    private finishLoading(): void {
        this.isLoading = false;
    }

    private setRaportGeneratedToTrue(): void {
        this.isRaportGenerated = true;
    }

    private setRaportGeneratedToFalse(): void {
        this.isRaportGenerated = false;
    }

    private showRaportGenerationErrorMessage(): void {
        this.toastService.showError('Nie udało się wygenerować raportu!');
    }
}

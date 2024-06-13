import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SellmentCloseRaport, SellmentCloseRaportData } from 'src/app/interfaces/sellment-close-product.interface';
import { FileService } from 'src/app/services/file.service';
import { SellmentCloseRaportService } from 'src/app/services/sellment-close-raport.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-sellment-close-raport',
    templateUrl: './sellment-close-raport.component.html',
    styleUrls: ['./sellment-close-raport.component.css'],
})
export class SellmentCloseRaportComponent implements OnInit {
    @Input() raportId: number | null = null;

    raportPreview$!: Observable<SellmentCloseRaport>;
    generateRaport$!: Observable<Blob>;

    isLoading = false;
    isRaportGenerated = false;

    constructor(
        private sellmentCloseRaportService: SellmentCloseRaportService,
        private fileService: FileService,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.raportPreview$ = this.getRaportPreviewFactory();
        this.generateRaport$ = this.generateRaportFactory();
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

    private generateRaportFactory(): Observable<Blob> {
        return this.raportId ? this.generateRaportById(this.raportId) : this.generateRaportLatest();
    }

    private getRaportPreviewFactory(): Observable<SellmentCloseRaport> {
        return this.raportId ? this.getRaportPreviewById(this.raportId) : this.getRaportPreviewLatest();
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

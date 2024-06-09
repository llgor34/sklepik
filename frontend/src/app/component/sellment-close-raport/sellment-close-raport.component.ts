import { Component, Input, OnInit } from '@angular/core';
import { SellmentCloseRaport } from 'src/app/interfaces/sellment-close-product.interface';
import { FileService } from 'src/app/services/file.service';
import { SellmentCloseRaportService } from 'src/app/services/sellment-close-raport.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-sellment-close-raport',
    templateUrl: './sellment-close-raport.component.html',
    styleUrls: ['./sellment-close-raport.component.css'],
})
export class SellmentCloseRaportComponent {
    @Input() raport!: SellmentCloseRaport;
    @Input() date!: string;

    isLoading = false;
    isRaportGenerated = false;

    constructor(
        private sellmentCloseRaportService: SellmentCloseRaportService,
        private fileService: FileService,
        private toastService: ToastService
    ) {}

    downloadRaport: (() => void) | null = null;

    generateRaport(): void {
        this.startLoading();
        this.sellmentCloseRaportService.generateRaport$().subscribe({
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

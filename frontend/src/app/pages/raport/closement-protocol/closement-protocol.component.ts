import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellmentCloseRaport } from 'src/app/interfaces/sellment-close-product.interface';
import { DateService } from 'src/app/services/date.service';
import { FileService } from 'src/app/services/file.service';
import { SellmentCloseRaportService } from 'src/app/services/sellment-close-raport.service';

@Component({
  selector: 'app-closement-protocol',
  templateUrl: './closement-protocol.component.html',
  styleUrls: ['./closement-protocol.component.css'],
})
export class ClosementProtocolComponent {
  raport: SellmentCloseRaport;
  todayDate = this.dateService.getDate();
  isLoading = false;
  raportGenerated = false;

  downloadFile: (() => void) | null = null;

  constructor(
    route: ActivatedRoute,
    private dateService: DateService,
    private sellmentCloseService: SellmentCloseRaportService,
    private fileService: FileService
  ) {
    this.raport = route.snapshot.data['products'] as SellmentCloseRaport;
  }

  generateRaport() {
    this.isLoading = true;
    this.sellmentCloseService.generateRaport().subscribe({
      next: (file) => {
        this.isLoading = false;
        this.raportGenerated = true;
        this.downloadFile = this.fileService.prepareFileForDownload(file);
        this.downloadFile();
      },
      error: (res) => {
        this.isLoading = false;
        alert('Nie udało się wygenerować raportu.');
      },
    });
  }

  downloadRaport() {
    this.downloadFile!();
  }
}

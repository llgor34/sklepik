import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  prepareFileForDownload(file: any) {
    const newBlob = new Blob([file], { type: 'application/pdf' });
    const downloadLink = document.createElement('a');
    downloadLink.target = '_self';
    downloadLink.download = 'raport.pdf';

    const data = window.URL.createObjectURL(newBlob);
    downloadLink.href = data;

    return () => {
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  }
}

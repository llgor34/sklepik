import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Version } from 'src/app/interfaces/version.interface';
import { VersionService } from 'src/app/services/version.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent {
    version$: Observable<Version>;

    constructor(private versionService: VersionService) {
        this.version$ = this.versionService.getVersion$();
    }
}

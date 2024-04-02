import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Version, VersionResponse } from '../interfaces/version.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class VersionService {
    constructor(private http: HttpClient) {}

    getVersion$(): Observable<Version> {
        return this.http.get<VersionResponse>('api/version').pipe(map((res) => res.version));
    }
}

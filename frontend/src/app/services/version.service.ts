import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Version } from '../interfaces/version.interface';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class VersionService {
    constructor(private http: HttpClient) {}

    getVersion$(): Observable<Version> {
        return this.http.get<Response<Version>>('api/version').pipe(map((res) => res.data));
    }
}

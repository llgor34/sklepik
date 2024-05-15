import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Lesson } from '../interfaces/lesson.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    constructor(private http: HttpClient) {}

    getLessons$(): Observable<Lesson[]> {
        return this.http.get<Response<Lesson[]>>('api/lessons').pipe(map((res) => res.data));
    }
}

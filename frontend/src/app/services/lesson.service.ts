import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Lesson, LessonResponse } from '../interfaces/lesson.interface';

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    constructor(private http: HttpClient) {}

    getLessons$(): Observable<Lesson[]> {
        return this.http.get<LessonResponse>('api/lessons').pipe(map((res) => res.lessons));
    }
}

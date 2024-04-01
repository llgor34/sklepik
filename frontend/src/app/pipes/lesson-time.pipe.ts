import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '../interfaces/lesson.interface';

@Pipe({
    name: 'lessonTime',
})
export class LessonTimePipe implements PipeTransform {
    transform(lesson: Lesson): string {
        return `${lesson.start_time}-${lesson.end_time}`;
    }
}

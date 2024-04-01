import { Response } from './response.interface';

export interface Lesson {
    id: number;
    start_time: string;
    end_time: string;
}

export interface LessonResponse extends Response {
    lessons: Lesson[];
}

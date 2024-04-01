import { query } from './db-functions.mjs';
import { Lesson } from './schema/lesson.mjs';

export async function getLessons() {
    let lessons = await query('SELECT * FROM lessons');
    lessons = lessons.map(
        (lesson) => new Lesson(lesson.id, formatLessonTime(lesson.start_time), formatLessonTime(lesson.end_time))
    );
    return lessons;
}

export async function getLessonById(id) {
    let lesson = (await query('SELECT * FROM lessons WHERE id = ?', [id]))[0];
    lesson = lesson
        ? new Lesson(lesson.id, formatLessonTime(lesson.start_time), formatLessonTime(lesson.end_time))
        : null;
    return lesson;
}

function formatLessonTime(time) {
    const [hour, minute, second] = time.split(':');
    return `${hour}:${minute}`;
}

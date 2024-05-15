export interface Response<T = null> {
    ok: boolean;
    message: string;
    data: T;
}

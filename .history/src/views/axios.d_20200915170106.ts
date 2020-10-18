import * as axios from 'axios'
declare module 'axios' {
    interface AxiosResponse<T> {
        data: T,
        total: number,
        phonecode: string，
    }
}
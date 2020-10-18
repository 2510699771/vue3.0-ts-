import * as axios from 'axios'
declare module 'axios' {
    interface AxiosResponse<T> {
        data
    }
}
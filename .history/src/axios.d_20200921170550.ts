import * as axios from 'axios'
declare module 'axios' {
    interface AxiosResponse<T> {
        data?: T,
        total?: number,
        code?: string,
        token?: string,
        user?: any,
        message?: string,
        data?: object,
        total?: number,
        type?: string,
        children?: [],
        flights?: []
        
    }
}
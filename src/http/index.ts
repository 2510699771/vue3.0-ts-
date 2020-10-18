import { message } from 'ant-design-vue'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const service: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000
})

service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    nprogress.start()
    return config
}, (err: AxiosError) => {
    nprogress.done()
    console.log(err)
    return Promise.reject(err)
})


service.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
    nprogress.done()
    return res.data
}, (err: AxiosError) => {
    nprogress.done()
    if (err.response && err.response.status) {
        let status = err.response.status
        console.log(err.response, "7877789");
        if (status === 400) {
            message.error(err.response.data.message)
        }

    }
})

export default service
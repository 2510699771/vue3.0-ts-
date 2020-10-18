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
        flights?: [],
        airline_name: string;
        airorders: null
        airport_tax_audlet: number
        airport_tax_child: number
        arr_date: string
        arr_datetime: string
        arr_time: string
        base_price: number
        created_at: number
        dep_date: string
        dep_datetime: string
        dep_time: string
        dst_airport: string
        dst_airport_name: string
        dst_airport_quay: string
        dst_city_name: string
        flight_no: string
        flights: null
        id: number
        insurances:object[]
        org_airport: string
        org_airport_name: string
        org_airport_quay: string
        org_city_name: string
    plane_name: "空客A350-900"
    plane_size: "M"
    updated_at: 1560775529357
}
}
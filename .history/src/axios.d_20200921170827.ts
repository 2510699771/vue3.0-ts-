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
        id: n
        insurances: (2)[{ … }, { … }]
    org_airport: "PEK"
    org_airport_name: "首都机场"
    org_airport_quay: "T3"
    org_city_name: "北京"
    plane_name: "空客A350-900"
    plane_size: "M"
    updated_at: 1560775529357
}
}
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
        arr_date: "2019-06-19"
        arr_datetime: "2019-06-19 10:45:00"
        arr_time: "10:45"
        base_price: 2030
        created_at: 1560775529357
        dep_date: "2019-06-19"
        dep_datetime: "2019-06-19 07:40:00"
        dep_time: "07:40"
        dst_airport: "CTU"
        dst_airport_name: "双流机场"
        dst_airport_quay: "T2"
        dst_city_name: "成都"
        flight_no: "CA1405"
        flights: null
        id: 101
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
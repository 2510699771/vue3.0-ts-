import service from './index'
const token = localStorage.getItem('token')
export default {
    // getData({ subject, model, testType, key }: { subject: string | number, model: string, testType: string, key: string }) {
    //     return service.get(`/query?subject=${subject}&model=${model}&testType=${testType}&key=${key}`)
    // },
    //轮播图
    getIndex() {
        return service.get('scenics/banners')
    },
    //验证码
    Accont({ tel }: { tel: string | number }) {
        return service.post(`captchas`, { tel })
    },
    //注册
    registered({ username, nickname, captcha, password }: { username: string | number, nickname: string, captcha: String, password: string }) {
        return service.post(`accounts/register`, { username, nickname, captcha, password })
    },
    //登录
    login({ username, password }: { username: string | number, password: string }) {
        return service.post(`accounts/login`, { username, password })
    },
    //城市菜单列表
    cities() {
        return service.get(`posts/cities`)
    },
    //文章列表
    articleList({ city }: { city: number | string }) {
        if (city) { return service.get(`posts?city=${city}`) }
        else { return service.get(`posts`) }
    },
    //查找城市
    getcities({ name }: { name: string }) {
        return service.get(`/cities?name=${name}`)
    },
    //文章详情  
    articleinfo({ id }: { id: number }) {
        return service.get(`/posts?id=${id}`)
    },
    //相关文章  
    about({ id }: { id: number }) {
        return service.get(`/posts/recommend?id=${id}`)
    },
    //获取文章评论
    comments({ post, _sort, _limit, _start }: { post: number, _sort: string, _limit: number, _start: number }) {
        return service.get(`posts/comments?post=${post}&_sort=${_sort}&_limit=${_limit},_start=${_start}`)
    },
    //特价机票
    airs() {
        return service.get(`/airs/sale`)
    },
    //机票列表
    JiPiao({ departCity, departCode, destCity, destCode, departDate }: {
        departCity: String, departCode: String, destCity: String, destCode: String, departDate: String
    }) {
        return service.get(`airs?departCity=${departCity}&departCode=${departCode}&destCity=${destCity}&destCode=${destCode}&departDate=${departDate}`)
    },
    //选择机票
    choseTicket({ id, seat_xid }: {
        id: number, seat_xid: String
    }) {
        return service.get(`/airs/${id}?seat_xid=${seat_xid}`)
    },
    //酒店详情
   // hotels({id,city,price_in,scenic,name_contains,hotellevel})
    options({}){}

}
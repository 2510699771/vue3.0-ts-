import service from './index'

export default {
    // getData({ subject, model, testType, key }: { subject: string | number, model: string, testType: string, key: string }) {
    //     return service.get(`/query?subject=${subject}&model=${model}&testType=${testType}&key=${key}`)
    // },
    //轮播图
    getIndex() {
        return service.get('scenics/banners')
    },
    //验证码
    Accont({ tel }: { tel: string }) {
        return service.post(`captchas`, { tel })
    },
    //注册
    registered({ username, nickname, captcha, password }: { username: string, nickname: string, captcha: String, password: string }) {
        return service.post(`accounts/register`, { username, nickname, captcha, password })
    }
}
import service from './index'

export default {
    // getData({ subject, model, testType, key }: { subject: string | number, model: string, testType: string, key: string }) {
    //     return service.get(`/query?subject=${subject}&model=${model}&testType=${testType}&key=${key}`)
    // },
    getIndex() {
        return service.get('/scenics/')
    }
}
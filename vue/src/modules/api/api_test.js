import base from './common/base'; // 导入接口域名列表
import axios from './common/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块  contentType: 'application/x-www-form-urlencoded'

const apiTest = {
    // post提交
    postQueryInfo(params) {
        return axios.post(`${base.testDomain}/get/userIdState`, JSON.stringify(params), {
            headers: {
                lock: true
            }
        });
    },
    getQueryInfo(params) {
        return axios.get(`${base.testDomain}/get/userIdState`, {
            params: params,
            headers: {
                lock: true
            }
        });
    }
};

export default apiTest;

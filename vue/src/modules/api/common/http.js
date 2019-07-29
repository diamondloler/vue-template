/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
<% if(category == 'h5') { %>
import { Toast, Indicator } from 'mint-ui';
<% }else{ %>
import { Message, Loading } from 'element-ui';
let Indicator = null;
<% } %>

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    <% if(category == 'h5') { %>
    Toast({
        message: msg,
        duration: 2000
    });
    <% }else{ %>
    Message.error(msg);
    <% } %>
};


/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    tip(other);
};

// 创建axios实例
let instance = axios.create({
    withCredentials: true,
    timeout: 1000 * 12
});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
instance.interceptors.request.use(
    // 请求成功
    config => {

        <% if(category == 'h5') { %>
        config.headers.lock && Indicator.open();
        <% }else{ %>
        Indicator = config.headers.lock && Loading.service({
            lock: true,
            text: '数据加载中，请稍后...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        <% } %>
        

        return config;
    });


// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    resp => {

        resp.config.headers.lock && Indicator.close();

        if (resp.status === 200) {
            // 业务方的
            if (resp.data.returnCode === 0) {
                return Promise.resolve(resp.data);
            } else {
                errorHandle(resp.data.returnCode, resp.data.description);
            }
        } else {
            return Promise.reject(resp);
        }
    },
    // 请求失败
    error => {
        
        error.config.headers.lock && Indicator.close();

        const { response } = error;
        if (!response) {
            tip('断网了，请重新刷新');
        }
        return Promise.reject(error);
    });

export default instance;
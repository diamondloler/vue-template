/**
 * 接口域名的管理
 */
let base = {};
if (process.env.NODE_ENV === 'development') {

    base = {
        testDomain: 'http://172.28.25.45:8001/mock/11'    // 172.28.25.45 fed-mock.huya.com
    };

} else {

    base = {
        Domain: 'http://172.28.25.45:8001/mock/11'    // 172.28.25.45 fed-mock.huya.com
    };

}



export default base;
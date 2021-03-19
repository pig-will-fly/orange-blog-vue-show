import axios from 'axios';
import store from '@/store'

// 创建axios实例
const instance = axios.create();

// 设置请求拦截器
instance.interceptors.request.use(
    config => {
        if (store.state.logInfo && store.state.logInfo.isLogin) {
            config.headers[store.state.logInfo.token.header] = store.state.logInfo.token.value;
        }
        config.baseURL = "/orange/api";
        // 请求超时时间
        config.timeout = 10000;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

/**
 * <p>GET请求</p>
 * @method get
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @return {Promise}
 * @since 2021-01-14 14:59:30
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * <p>POST请求</p>
 * @method get
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @return {Promise}
 * @since 2021-01-14 14:59:30
 */
export function post(url, params, config) {
    return new Promise((resolve, reject) => {
        instance.post(url, params, config).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * <p>PUT请求</p>
 * @method get
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @return {Promise}
 * @since 2021-01-14 14:59:30
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        instance.put(url, params).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * <p>DELETE请求</p>
 * @method get
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @return {Promise}
 * @since 2021-01-14 14:59:30
 */
export function del(url, params) {
    return new Promise((resolve, reject) => {
        instance.delete(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

// 响应拦截器
instance.interceptors.response.use(res => {
        if (res.status === 200) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    }, err => {
        if (err.response.status) {
            switch (err.response.status) {
                // 404请求不存在
                case 404:
                    alert("请求不存在");
                    break;
            }
            return Promise.reject(err.response);
        }
    }
);

export default instance;
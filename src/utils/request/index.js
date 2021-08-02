import request from './request';
export const get = (url, params = {}, config = {}) => request({ method: 'get', url, params, ...config });
export const post = (url, data = {}, config = {}) => request({ method: 'post', url, data, ...config });
export const put = (url, data = {}, config = {}) => request({ method: 'put', url, data, ...config });
export const patch = (url, data = {}, config = {}) => request({ method: 'patch', url, data, ...config });
export const del = (url, data = {}, config = {}) => request({ method: 'delete', url, data, ...config });

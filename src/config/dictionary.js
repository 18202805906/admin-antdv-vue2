// HTTP状态码
export const HTTP_CODE = {
  400: '请求参数错误',
  401: '未授权, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  409: '请求发生冲突',
  410: '请求的资源已删除',
  413: '请求体过大，服务器无法处理',
  414: '请求url过长',
  415: '不支持的媒体类型',
  429: '请求次数超过限制',
  500: '服务器端内部错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网络错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
};

// 性别
export const SEX = {
  1: '男',
  2: '女'
};
export const MENU_TYPE = {
  0: '菜单',
  1: '按钮'
};
export const MESSAGE_TYPE = {
  SYSTEM: '系统消息',
  WARNING: '预警消息',
  OTHER: '其它'
};
export const MESSAGE_STATUS = {
  0: '未读',
  1: '已读'
};


export const LOG_TYPE = {
  LOGIN: '登录日志',
  OPERATION: '操作日志',
  REMOTE_SUBSCRIBE: '订阅日志',
  STATUS_PUSH: '推送日志'
};
export const USER_STATUS = {
  0: '正常',
  1: '已锁定',
  2: '已删除'
};

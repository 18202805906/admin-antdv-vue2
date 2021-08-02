/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-04-07 10:30:49
 * @LastEditors: Bwrong
 * @LastEditTime: 2021-04-22 15:10:47
 */
import moment from '@/plugins/moment';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

/**
 * 格式化时间
 * @param {*} value
 * @param {*} type
 */
export function formatTime(time = new Date(), type = 'YYYY-MM-DD HH:mm:ss') {
  return time ? moment(Number(time)).format(type) : '';
}
// 转换成浮点数
export function toFixed(val, dig = 2) {
  return Number(val).toFixed(dig);
}

/**
 * 获取URL中的参数名及参数值的集合
 * @param {[string]} url [当该参数不为空的时候，则解析该url中的参数集合]
 * @return {[string]}       [参数集合]
 */
export function getQuery(url) {
  if (url.indexOf('?') === -1) return {};
  let query = {};
  let str = url.split('?')[1];
  let strs = str.split('&');
  for (let i = 0; i < strs.length; i++) {
    query[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
  }
  return query;
}
/**
 * 密码加密加盐
 * @param {*} password 要加密的密码
 * @param {*} cryptoKey 盐
 */
export function cryptoPassword(password, cryptoKey) {
  return Base64.stringify(Utf8.parse(`${cryptoKey}${password}`));
  // return md5(`${cryptoKey}${password}`).toString();
}


/**
 * 检查上传文件大小
 * @param size
 * @param limit
 */
export function checkFileSize(size, limit) {
  return size > 1024 * 1024 * limit ? `上传文件大小不能超过${limit}MB` : '';
}
/**
 * 检查上传文件是否是图片
 * @param mime
 * @param types
 */
export function checkIsImage(mime, types = ['image/gif', 'image/x-png', 'image/png', 'image/pjpeg', 'image/jpeg', 'image/bmp'], msg = '上传文件格式不正确') {
  return types.includes(mime) ? '' : msg;
}
/**
 * 检查上传文件是否是视频
 * @param mime
 * @param types
 */
export function checkIsVideo(mime, types = ['video/mp4'], msg = '上传文件格式不正确') {
  return types.includes(mime) ? '' : msg;
}
/********** 工具函数 ************/
/**
 * 将一维数组格式转换成树结构
 * TODO: 考虑使用尾递归优化算法
 * @param {*} data  需要转换的数据
 * @param {*} pid   顶级节点的id
 * @param {*} children   子集标识key
 * @param {*} pidName    父级标识key
 * @param {*} idName     id标识key
 */
export function convertToTree({ data, pid = 0, children = 'children', pidName = 'parentId', idName = 'id' }) {
  let arr = [];
  data.map((item) => {
    if (item[pidName] === pid) {
      let child = item[children] || [];
      let temp = child.concat(convertToTree({ data, pid: item[idName], children, pidName, idName }));
      temp.length && (item[children] = temp);
      return arr.push(item);
    }
  });
  return arr;
}
/**
 * 生成表格序号
 * @param {*} pageNow
 * @param {*} pageSize
 * @param {*} index
 */
export function ganerTableIndex(pageNow = 1, pageSize = 10, index = 0) {
  return (pageNow - 1) * pageSize + index + 1;
}
/**
 * 下载文件
 * @param content
 * @param filename
 */
 export function downloadFile(content, filename) {
  const a = document.createElement('a');
  const blob = content instanceof Blob ? content : new Blob([content]);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
 }
/**
 * 将数组转换成对象
 * @param arraryData
 * @param key
 * @param value
 * @returns
 */
 export function arrayToObj(arraryData, key, value) {
  return arraryData.reduce((temp, item) => ((temp[item[key]] = value ? item[value] : item), temp), {});
}
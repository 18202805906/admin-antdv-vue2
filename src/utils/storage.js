/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-04-07 10:30:49
 * @LastEditors: Bwrong
 * @LastEditTime: 2020-12-10 15:35:01
 */

const Storage = localStorage; // 配置使用的存储器
export function setStorage(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  Storage.setItem(key, value);
}
export function getStorage(key) {
  let value = Storage.getItem(key) || '';
  return value.match(/(^\[[\s\S]*\]$|^\{[\s\S]*\}$)/) ? JSON.parse(value) : value;
}
export function removeStorage(...keys) {
  return keys.map((item) => Storage.removeItem(item));
}
export function clearStorage() {
  return Storage.clear();
}
export function keyStorage(index) {
  return Storage.key(index);
}
export default {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  keyStorage
};

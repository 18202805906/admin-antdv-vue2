import { formatTime as formatTimeFn } from '@/utils';
import { SEX } from '@/config/dictionary';
export function formatSex(value) {
  return SEX[value] || '';
}
export function formatTime(time, type) {
  return formatTimeFn(time, type);
}
export function toFixed(val, dig = 2) {
  return Number(val).toFixed(dig);
}

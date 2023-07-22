import { Validator } from '@/types';

export function required(): Validator {
  return (s: string) => (s ? '' : '必填项');
}

export function match(reg: RegExp, message?: string): Validator {
  return (s: string) => (reg.test(s) ? '' : message || '格式不合法');
}

export function length(min: number, max: number, message?: string) {
  return (s: string) => {
    const n = s.length;
    if (n < min) {
      return message || `长度小于${min}`;
    }
    if (n > max) {
      return message || `长度大于${max}`;
    }
    return '';
  };
}

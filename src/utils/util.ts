import { ResponseError } from '@/api';

export function getFormData(e: SubmitEvent): Record<string, any> {
  const data = new FormData(e.target as HTMLFormElement);
  const res: Record<string, any> = {};

  for (const [k, v] of data.entries()) {
    res[k] = v;
  }

  return res;
}

export function handleResponseError(error: ResponseError) {
  if (error.statusCode === 400) {
    window.alert(`格式错误：${error.message.join('，')}`);
  } else if (error.statusCode === 401) {
    window.alert(`鉴权错误：你可能需要重新登录`);
  } else if (error.statusCode === 4000) {
    window.alert(error.message);
  } else {
    window.alert(`意外错误：${(error as any).error}`);
  }
}

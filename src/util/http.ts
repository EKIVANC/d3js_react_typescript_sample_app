import IHttpResponse from '../interface/IHttpResponse';
import { notificationMsgAnErrorResponse } from './constants';
import IHttpRequest from '../interface/IHttpRequest';

export default async function http<T>(
  request: RequestInfo
): Promise<IHttpResponse<T>> {
  const response: IHttpResponse<T> = await fetch(request);
  response.parsedBody = await response.json();
  if (response.status !== 200) {
    throw new Error(
      `${notificationMsgAnErrorResponse}: ${response.statusText}`
    );
  }
  return response;
}

export async function post<T>(
  path: string,
  body: IHttpRequest,
  args: RequestInit = { method: 'post', body: body.data }
): Promise<IHttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

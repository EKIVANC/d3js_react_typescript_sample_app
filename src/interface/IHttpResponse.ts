export default interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

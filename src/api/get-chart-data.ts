import http from '../util/http';
import IChartData from '../interface/IChartData';
import { getDataApiUrl } from '../util/constants';
import IHttpResponse from '../interface/IHttpResponse';

export default async function getChartData(): Promise<
  IHttpResponse<IChartData[]>
> {
  return await http<IChartData[]>(getDataApiUrl);
}

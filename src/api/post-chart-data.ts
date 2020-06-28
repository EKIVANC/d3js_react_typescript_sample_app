import { post } from '../util/http';
import IChartData from '../interface/IChartData';
import IAddChartDataResponse from '../interface/IAddChartDataResponse';
import { postDataApiUrl } from '../util/constants';
import IHttpResponse from '../interface/IHttpResponse';

export default async function postChartData(
  data: IChartData
): Promise<IHttpResponse<IAddChartDataResponse>> {
  return await post<IAddChartDataResponse>(postDataApiUrl, {
    data: JSON.stringify(data),
  });
}

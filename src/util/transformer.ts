import IHttpResponse from '../interface/IHttpResponse';
import IChartData from '../interface/IChartData';

/**
 * Transform API output for d3 chart input,
 * conversion of x field to Date format is particularly important
 */
export default function transformToIChartData(
  response: IHttpResponse<IChartData[]>
): IChartData[] {
  let result: { x: Date; y: number }[] = [];

  if (response && response.parsedBody) {
    result = response.parsedBody.map((row) => {
      return {
        x: new Date(row.x),
        y: row.y,
      };
    });
  }
  return result;
}

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import IChartData from '../../interface/IChartData';

const plotMargins = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 30,
};

const width = 960;
const height = 480;

type LineChartProps = {
  data: IChartData[];
};

export const LineChart = ({ data }: LineChartProps): JSX.Element => {
  const container = useRef(null);

  // work only component !
  useEffect(() => {
    if (!data) {
      return;
    }
    const canvas = d3
      .select(container.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xMin =
      d3.min(data, (d) => {
        return new Date(d.x);
      }) || new Date();
    const xMmax =
      d3.max(
        data,
        (d): Date => {
          return new Date(d.x);
        }
      ) || new Date();
    const yMin =
      d3.min(data, (d) => {
        return d.y;
      }) || 0;
    const yMmax =
      d3.max(data, (d) => {
        return d.y;
      }) || 0;

    const xScale = d3
      .scaleTime()
      .domain([xMin, xMmax])
      .range([plotMargins.left, width - plotMargins.right])
      .nice();
    const yScale = d3
      .scaleLinear()
      .domain([yMmax, yMin])
      .range([plotMargins.top, height - plotMargins.bottom]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisRight(yScale);
    //create x Axis
    canvas
      .append('g')
      .attr('transform', 'translate(0,' + (height - plotMargins.bottom) + ')')
      .call(xAxis);
    //create y Axis
    canvas
      .append('g')
      .attr('transform', 'translate( ' + plotMargins.left + '  ,0)')
      .call(yAxis);

    // define the line generator
    const lineGenerator = d3
      .line<IChartData>()
      .x((d) => {
        return xScale(d['x']);
      })
      .y((d) => {
        return yScale(d['y']);
      })
      .curve(d3.curveBasis);

    const line = lineGenerator(data) || '';

    canvas
      .append('path')
      .attr('d', line)
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }, []);

  return <div className="line-chart" ref={container} />;
};

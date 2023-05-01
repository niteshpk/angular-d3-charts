import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

export interface IItem {
  name: string;
  value: number;
}

export interface IOptions {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  colorScheme: string[];
  xAxisLabel: string;
  yAxisLabel: string;
}

@Component({
  selector: 'app-bar-chart',
  template: '<svg></svg>',
})
export class BarChartComponent implements OnChanges {
  @Input() data: IItem[] = [];
  @Input() options: IOptions = {} as IOptions;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.createChart();
    }
  }

  private createChart(): void {
    const { width, height, margin, colorScheme, xAxisLabel, yAxisLabel } =
      this.options;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select('svg').attr('width', width).attr('height', height);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleBand()
      .range([0, chartWidth])
      .domain(this.data.map((d) => d.name))
      .paddingInner(0.1);

    const yScale = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(this.data, (d: any) => d.value)]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale).ticks(5);

    chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    chart.append('g').attr('class', 'y-axis').call(yAxis);

    chart
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => Number(xScale(d.name)))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - yScale(d.value))
      .attr('fill', (d, i) => colorScheme[i % colorScheme.length]);

    chart
      .append('text')
      .attr('class', 'x-label')
      .attr('text-anchor', 'middle')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + margin.bottom)
      .text(xAxisLabel);

    chart
      .append('text')
      .attr('class', 'y-label')
      .attr('text-anchor', 'middle')
      .attr('x', 0 - chartHeight / 2)
      .attr('y', 0 - margin.left)
      .attr('dy', '1em')
      .attr('transform', 'rotate(-90)')
      .text(yAxisLabel);
  }
}

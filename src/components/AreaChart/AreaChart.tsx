import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { semanticColor } from '@/styles/colors';
import { ChartContainer, ChartTitle } from './AreaChart.style';
import { typoStyleMap } from '@/styles/typos';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const cleanCSS = (css: string) => css.replace(/\s+/g, ' ').trim();

const options: ApexOptions = {
  chart: {
    type: 'area',
    background: semanticColor.bg.default,
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
    colors: [semanticColor.bg.primary],
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  xaxis: {
    type: 'datetime',
    crosshairs: {
      show: false,
    },
    labels: {
      format: 'yyyy.MM.dd',
    },
    tickAmount: 6,
    tooltip: {
      enabled: false,
    },
  },
  tooltip: {
    followCursor: true,
    enabled: true,
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const value = series[seriesIndex][dataPointIndex];
      const date = new Date(w.globals.labels[dataPointIndex]);

      const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
      const prevMonthStart = '2023.10.1';
      const prevMonthEnd = '2023.10.31';
      const changePercent = 3;

      return `
      <div style="
        padding: 10px;
        border-radius: 15px;
        background: ${semanticColor.card.card1};
        width: 137px;
      ">
        <div style="${cleanCSS(typoStyleMap['title2'])}; color: ${
        semanticColor.text.normal.primary
      };">${value}
         <span style="${cleanCSS(typoStyleMap['caption3_b'])}; color: ${
        semanticColor.text.normal.primary
      };">%</span>
         </div>
        <div style="font-size: 12px; color: #9CA3AF; margin-top: 4px;">
          ${prevMonthStart} - ${prevMonthEnd}
        </div>
        <div style="font-size: 13px; margin-top: 4px; color: #4B5563;">
          이전 달 대비
          <span style="color: #10B981; font-weight: 600; margin-left: 4px;">
            ▲ ${changePercent}%
          </span>
        </div>
      </div>
    `;
    },
  },
};

const series = [
  {
    name: '금리',
    data: [
      [new Date('2025-03-01').getTime(), 10.2],
      [new Date('2025-03-05').getTime(), 9.8],
      [new Date('2025-03-11').getTime(), 11.0],
      [new Date('2025-03-17').getTime(), 10.7],
      [new Date('2025-03-23').getTime(), 9.3],
      [new Date('2025-03-29').getTime(), 12.0],
      [new Date('2025-04-02').getTime(), 11.5],
      [new Date('2025-04-08').getTime(), 10.9],
      [new Date('2025-04-13').getTime(), 11.7],
      [new Date('2025-04-18').getTime(), 10.1],
      [new Date('2025-04-22').getTime(), 12.3],
      [new Date('2025-04-28').getTime(), 9.9],
      [new Date('2025-05-03').getTime(), 10.4],
      [new Date('2025-05-09').getTime(), 11.6],
      [new Date('2025-05-15').getTime(), 9.5],
      [new Date('2025-05-21').getTime(), 12.8],
      [new Date('2025-05-27').getTime(), 10.6],
    ],
  },
];

const AreaChart = () => {
  return (
    <ChartContainer>
      <ChartTitle>나의 대출 금리 변화</ChartTitle>
      <ApexChart options={options} series={series} type="area" height={180} />
    </ChartContainer>
  );
};

export default AreaChart;

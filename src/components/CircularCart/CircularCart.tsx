'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { ChartOverlay, KCBLabel, Percentile, Score, Wrapper } from './CircularChart.style';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CircularChartProps {
  loading?: boolean;
  score: number;
  rank: string;
}

const CircularChart = ({ loading = false, score, rank }: CircularChartProps) => {
  const displaySeries = loading ? [100] : [(score / 1000) * 100];

  const options: ApexCharts.ApexOptions = {
    chart: {
      width: 300,
      height: 300,
      type: 'radialBar',
      animations: {
        enabled: true,
        speed: loading ? 1800 : 600,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '84%',
        },
        track: {
          strokeWidth: '100%',
        },
        dataLabels: {
          show: false,
          name: {
            offsetY: -50,
            show: true,
            color: '#888',
            fontSize: '13px',
          },
          value: {
            color: '#111',
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['KCB'],
  };

  const series = [67];

  return (
    <Wrapper
      animate={
        loading
          ? {
              opacity: [1, 0.4, 1],
            }
          : {
              opacity: 1,
            }
      }
      transition={
        loading
          ? {
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : { duration: 0.3 }
      }
    >
      <ApexChart options={options} series={displaySeries} type="radialBar" height={280} />
      <ChartOverlay>
        <KCBLabel>KCB</KCBLabel>
        <Score>
          {!loading && (
            <>
              <Score strong={true}>{score}</Score>점
            </>
          )}
        </Score>
        <Percentile>{!loading && rank}</Percentile>
      </ChartOverlay>
    </Wrapper>
  );
};

export default CircularChart;

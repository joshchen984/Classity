import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';

type ClassChartProps = {
  labels: string[] | undefined;
  grades: number[] | undefined;
  currentGrades?: number[];
};
const ClassChart = ({ labels, grades, currentGrades }: ClassChartProps) => {
  const theme = useTheme();
  const datasets = [
    {
      label: '% of Grade',
      data: grades,
      backgroundColor: theme.palette.secondary.main,
    },
  ];
  if (currentGrades) {
    datasets.unshift({
      label: 'Current Grade',
      data: currentGrades,
      backgroundColor: theme.palette.primary.main,
    });
  }
  const data = {
    labels,
    datasets,
  };
  return <Bar data={data} />;
};
ClassChart.defaultProps = {
  currentGrades: null,
};
export default ClassChart;

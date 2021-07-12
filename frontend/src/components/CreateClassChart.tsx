import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';

type CreateClassChartProps = {
  labels: string[];
  grades: number[];
};
const CreateClassChart = ({ labels, grades }: CreateClassChartProps) => {
  const theme = useTheme();
  const data = {
    labels,
    datasets: [
      {
        label: '% of Grade',
        data: grades,
        backgroundColor: theme.palette.secondary.main,
      },
    ],
  };
  return <Bar data={data} />;
};
export default CreateClassChart;

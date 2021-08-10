import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  chart: {
    maxWidth: '100%',
  },
}));

type ClassChartProps = {
  labels: string[] | undefined;
  grades: number[] | undefined;
  currentGrades?: number[];
};
const ClassChart = ({ labels, grades, currentGrades }: ClassChartProps) => {
  const theme = useTheme();
  const classes = useStyles();
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
  return <Bar className={classes.chart} data={data} />;
};
ClassChart.defaultProps = {
  currentGrades: null,
};
export default ClassChart;

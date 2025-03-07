import { Bar } from 'react-chartjs-2';
import { useThemeStore } from '../../store/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[];
  labels: string[];
  title: string;
  changes?: number[];
}

export function BarChart({ data, labels, title, changes }: BarChartProps) {
  const { isDark } = useThemeStore();

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: data.map((_, index) => {
          if (changes && changes[index] < 0) {
            return 'rgba(239, 68, 68, 0.5)'; // Red for negative
          }
          return 'rgba(59, 130, 246, 0.5)'; // Blue for positive
        }),
        borderColor: data.map((_, index) => {
          if (changes && changes[index] < 0) {
            return '#ef4444'; // Red for negative
          }
          return '#3b82f6'; // Blue for positive
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const index = context.dataIndex;
            if (changes && changes[index] !== undefined) {
              const change = changes[index];
              const sign = change >= 0 ? '+' : '';
              return `تغییر: ${sign}${change}٪`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
      },
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
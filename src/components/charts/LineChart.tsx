import { Line } from 'react-chartjs-2';
import { useThemeStore } from '../../store/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: number[];
  labels: string[];
  title: string;
  changes?: number[];
}

export function LineChart({ data, labels, title, changes }: LineChartProps) {
  const { isDark } = useThemeStore();
  
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        pointBackgroundColor: data.map((_, index) => {
          if (changes && changes[index] < 0) {
            return '#ef4444'; // Red for negative
          }
          return '#3b82f6'; // Blue for positive
        }),
        pointBorderColor: data.map((_, index) => {
          if (changes && changes[index] < 0) {
            return '#ef4444'; // Red for negative
          }
          return '#3b82f6'; // Blue for positive
        }),
        pointRadius: 5,
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

  return <Line data={chartData} options={options} />;
}
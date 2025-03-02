import { useThemeStore } from '../../store/theme';

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
}

export function Table({ columns, data, actions }: TableProps) {
  const { isDark } = useThemeStore();

  return (
    <div className={`overflow-x-auto rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <table className="w-full">
        <thead>
          <tr className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={`px-6 py-3 text-right ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {column.header}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-center">عملیات</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-t ${
                isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className={`px-6 py-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
                >
                  {row[column.accessor]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-center">{actions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
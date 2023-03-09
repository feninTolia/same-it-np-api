import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'type' | 'address' | 'schedule' | 'maxWeight';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'type', label: 'Відділення / Поштомат', minWidth: 170 },
  { id: 'address', label: 'Адреса', minWidth: 100 },
  {
    id: 'schedule',
    label: 'Графік роботи',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'maxWeight',
    label: 'Вага до',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  type: string;
  address: string;
  schedule: string;
  maxWeight: string;
}

function createData(
  type: string,
  address: string,
  schedule: string,
  maxWeight: string
): Data {
  return { type, address, schedule, maxWeight };
}

const rows = [
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
  createData(
    'Відд 1',
    'Київ, вул. Пирогівський шлях, 135',
    'Сьогодні:: 08:00-21:00',
    '1100 кг'
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.address}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

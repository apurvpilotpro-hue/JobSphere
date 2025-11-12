import React, { useState, ReactElement } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { useJobApplications } from '../../contexts/JobApplicationsContext';
import { JobApplication } from '../../contexts/JobApplicationsContext';

type Order = 'asc' | 'desc';

type ColumnId = keyof JobApplication | 'salaryRange';

interface Column {
  id: ColumnId;
  label: string;
  minWidth?: number;
  format?: (value: any) => string | ReactElement;
  sortKey?: keyof JobApplication;
}

const columns: Column[] = [
  { id: 'appliedDate', label: 'Applied Date', minWidth: 100, sortKey: 'appliedDate' },
  { id: 'company', label: 'Company', minWidth: 130, sortKey: 'company' },
  { id: 'jobTitle', label: 'Position', minWidth: 130, sortKey: 'jobTitle' },
  { 
    id: 'status',
    label: 'Status',
    minWidth: 100,
    sortKey: 'status',
    format: (value: string) => (
      <Chip 
        label={value}
        color={
          value === 'Accepted' ? 'success' :
          value === 'Rejected' ? 'error' :
          value === 'Interview' ? 'primary' :
          'default'
        }
        variant="outlined"
      />
    )
  },
  { id: 'locationCity', label: 'City', minWidth: 100, sortKey: 'locationCity' },
  { 
    id: 'salaryRange', 
    label: 'Salary Range',
    minWidth: 130,
    sortKey: 'salaryMin',
    format: (value: JobApplication) => `${value.salaryCurrency} ${value.salaryMin}-${value.salaryMax} ${value.salaryPeriod}`
  },
];

export const ApplicationsList: React.FC = () => {
  const { applications } = useJobApplications();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof JobApplication>('appliedDate');
  const [order, setOrder] = useState<Order>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequestSort = (property: ColumnId) => {
    const column = columns.find(col => col.id === property);
    if (!column?.sortKey) return;
    
    const isAsc = orderBy === column.sortKey && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column.sortKey);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredApplications = Object.values(applications).filter((application) =>
    application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.locationCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedApplications = filteredApplications.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (!aValue || !bValue) return 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }

    return 0;
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom component="div">
          Job Applications
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedApplications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((application) => (
                <TableRow hover tabIndex={-1} key={application.applicationId}>
                  {columns.map((column) => {
                    const value = column.id === 'salaryRange' ? application : application[column.id as keyof JobApplication];
                    return (
                      <TableCell key={column.id}>
                        {column.format ? column.format(value) : String(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredApplications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
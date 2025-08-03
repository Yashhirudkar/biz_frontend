'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  AppBar,
  Toolbar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';

const initialStudents = [
  {
    id: 's001',
    name: 'Alice Smith',
    email: 'alice.s@example.com',
    contact: '123-456-7890',
    class: '10th',
    batch: '2024',
    admissionDate: '2023-09-01',
    guardianInfo: 'John Smith (Father), Jane Smith (Mother)',
  },
  {
    id: 's002',
    name: 'Bob Johnson',
    email: 'bob.j@example.com',
    contact: '098-765-4321',
    class: '11th',
    batch: '2023',
    admissionDate: '2022-08-15',
    guardianInfo: 'David Johnson (Father)',
  },
  {
    id: 's003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    contact: '555-123-4567',
    class: '10th',
    batch: '2024',
    admissionDate: '2023-09-10',
    guardianInfo: 'Sally Brown (Mother)',
  },
  {
    id: 's004',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    contact: '111-222-3333',
    class: '12th',
    batch: '2023',
    admissionDate: '2022-09-05',
    guardianInfo: 'Queen Hippolyta (Mother)',
  },
  {
    id: 's005',
    name: 'Eve Adams',
    email: 'eve.a@example.com',
    contact: '444-555-6666',
    class: '11th',
    batch: '2024',
    admissionDate: '2023-10-01',
    guardianInfo: 'Mr. Adams (Father)',
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
    class: '',
    batch: '',
    admissionDate: '',
    guardianInfo: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setFormState({
      id: '',
      name: '',
      email: '',
      contact: '',
      class: '',
      batch: '',
      admissionDate: '',
      guardianInfo: '',
    });
    setOpenDialog(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setFormState({ ...student });
    setOpenDialog(true);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleFormChange = (field) => (event) => {
    setFormState({ ...formState, [field]: event.target.value });
  };

  const handleSubmitForm = () => {
    if (currentStudent) {
      setStudents(
        students.map((s) => (s.id === currentStudent.id ? { ...formState, id: currentStudent.id } : s))
      );
    } else {
      const newId = `s${(students.length + 1).toString().padStart(3, '0')}`;
      setStudents([...students, { ...formState, id: newId }]);
    }
    setOpenDialog(false);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contact.toLowerCase().includes(searchTerm.toLowerCase());
      const matchClass = filterClass === '' || s.class === filterClass;
      const matchBatch = filterBatch === '' || s.batch === filterBatch;
      return matchSearch && matchClass && matchBatch;
    });
  }, [students, searchTerm, filterClass, filterBatch]);

  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddStudent}>
            Add New Student
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="10th">10th</MenuItem>
                  <MenuItem value="11th">11th</MenuItem>
                  <MenuItem value="12th">12th</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} md={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Batch</InputLabel>
                <Select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Admission Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.batch}</TableCell>
                    <TableCell>{s.admissionDate}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleEditStudent(s)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteStudent(s.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            count={filteredStudents.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentStudent ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {['name', 'email', 'contact', 'guardianInfo'].map((field) => (
              <Grid item xs={12} sm={field === 'guardianInfo' ? 12 : 6} key={field}>
                <TextField
                  label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  value={formState[field]}
                  onChange={handleFormChange(field)}
                  fullWidth
                  multiline={field === 'guardianInfo'}
                  rows={field === 'guardianInfo' ? 2 : 1}
                  margin="dense"
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Class</InputLabel>
                <Select value={formState.class} onChange={handleFormChange('class')} label="Class">
                  <MenuItem value="10th">10th</MenuItem>
                  <MenuItem value="11th">11th</MenuItem>
                  <MenuItem value="12th">12th</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Batch</InputLabel>
                <Select value={formState.batch} onChange={handleFormChange('batch')} label="Batch">
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Admission Date"
                type="date"
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                value={formState.admissionDate}
                onChange={handleFormChange('admissionDate')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitForm}>
            {currentStudent ? 'Save Changes' : 'Add Student'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

'use client'

import React, { useState, useMemo } from 'react'
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
} from '@mui/material'
import { Add, Edit, Delete, Search } from '@mui/icons-material'

const initialTeachers = [
  {
    id: 't001',
    name: 'Mr. John Doe',
    email: 'john.d@example.com',
    contact: '987-654-3210',
    subject: 'Mathematics',
    department: 'Science',
    hireDate: '2020-01-15',
    qualification: 'M.Sc. Mathematics',
  },
  {
    id: 't002',
    name: 'Ms. Jane Smith',
    email: 'jane.s@example.com',
    contact: '111-222-3333',
    subject: 'Physics',
    department: 'Science',
    hireDate: '2019-08-01',
    qualification: 'Ph.D. Physics',
  },
  {
    id: 't003',
    name: 'Dr. Emily White',
    email: 'emily.w@example.com',
    contact: '444-555-6666',
    subject: 'Chemistry',
    department: 'Science',
    hireDate: '2021-03-10',
    qualification: 'Ph.D. Chemistry',
  },
  {
    id: 't004',
    name: 'Mr. Robert Green',
    email: 'robert.g@example.com',
    contact: '777-888-9999',
    subject: 'English',
    department: 'Languages',
    hireDate: '2018-06-20',
    qualification: 'M.A. English Literature',
  },
  {
    id: 't005',
    name: 'Ms. Sarah Blue',
    email: 'sarah.b@example.com',
    contact: '000-111-2222',
    subject: 'History',
    department: 'Humanities',
    hireDate: '2022-02-01',
    qualification: 'M.A. History',
  },
]

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState(null)
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
    subject: '',
    department: '',
    hireDate: '',
    qualification: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleAddTeacher = () => {
    setCurrentTeacher(null)
    setFormState({
      id: '',
      name: '',
      email: '',
      contact: '',
      subject: '',
      department: '',
      hireDate: '',
      qualification: '',
    })
    setOpenDialog(true)
  }

  const handleEditTeacher = (teacher) => {
    setCurrentTeacher(teacher)
    setFormState({ ...teacher })
    setOpenDialog(true)
  }

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id))
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleFormChange = (field) => (event) => {
    setFormState({
      ...formState,
      [field]: event.target.value,
    })
  }

  const handleSubmitForm = () => {
    if (currentTeacher) {
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === currentTeacher.id ? { ...formState, id: currentTeacher.id } : teacher
        )
      )
    } else {
      const newId = `t${(teachers.length + 1).toString().padStart(3, '0')}`
      setTeachers([...teachers, { ...formState, id: newId }])
    }
    handleCloseDialog()
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleFilterSubjectChange = (event) => {
    setFilterSubject(event.target.value)
    setPage(0)
  }

  const handleFilterDepartmentChange = (event) => {
    setFilterDepartment(event.target.value)
    setPage(0)
  }

  const applyFilters = () => {
    setPage(0)
  }

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.contact.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = filterSubject === '' || teacher.subject === filterSubject
      const matchesDepartment = filterDepartment === '' || teacher.department === filterDepartment
      return matchesSearch && matchesSubject && matchesDepartment
    })
  }, [teachers, searchTerm, filterSubject, filterDepartment])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedTeachers = filteredTeachers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Teacher / Staff Management
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddTeacher}>
            Add New Teacher
          </Button>
        </Toolbar>
      </AppBar>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Teachers"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Subject</InputLabel>
              <Select value={filterSubject} label="Subject" onChange={handleFilterSubjectChange}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="History">History</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select value={filterDepartment} label="Department" onChange={handleFilterDepartmentChange}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Languages">Languages</MenuItem>
                <MenuItem value="Humanities">Humanities</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="contained" fullWidth onClick={applyFilters}>
              Apply Filters
            </Button>
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
                <TableCell>Subject</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Hire Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>{teacher.hireDate}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleEditTeacher(teacher)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteTeacher(teacher.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedTeachers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No teachers found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTeachers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentTeacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                fullWidth
                value={formState.name}
                onChange={handleFormChange('name')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={formState.email}
                onChange={handleFormChange('email')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Contact"
                fullWidth
                value={formState.contact}
                onChange={handleFormChange('contact')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Subject</InputLabel>
                <Select value={formState.subject} onChange={handleFormChange('subject')}>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Physics">Physics</MenuItem>
                  <MenuItem value="Chemistry">Chemistry</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Department</InputLabel>
                <Select value={formState.department} onChange={handleFormChange('department')}>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Languages">Languages</MenuItem>
                  <MenuItem value="Humanities">Humanities</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Hire Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formState.hireDate}
                onChange={handleFormChange('hireDate')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Qualification"
                fullWidth
                multiline
                rows={2}
                value={formState.qualification}
                onChange={handleFormChange('qualification')}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Upload Resume/Documents
                <input type="file" hidden multiple />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitForm} variant="contained">
            {currentTeacher ? 'Save Changes' : 'Add Teacher'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

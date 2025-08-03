"use client"

import React, { useState, useMemo } from "react"
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
  Chip,
  OutlinedInput,
} from "@mui/material"
import { Add, Edit, Delete, Search } from "@mui/icons-material"

const allSubjects = ["Mathematics", "Physics", "Chemistry", "English", "History", "Biology", "Computer Science"]
const allTeachers = ["Mr. John Doe", "Ms. Jane Smith", "Dr. Emily White", "Mr. Robert Green", "Ms. Sarah Blue"]

const initialClasses = [
  {
    id: "c001",
    name: "10th Grade - Batch A",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    teachers: ["Mr. John Doe", "Ms. Jane Smith"],
    schedule: "Mon-Fri, 9:00 AM - 1:00 PM",
    room: "Room 101",
  },
  {
    id: "c002",
    name: "11th Grade - Batch B",
    subjects: ["English", "History"],
    teachers: ["Mr. Robert Green", "Ms. Sarah Blue"],
    schedule: "Mon-Wed, 2:00 PM - 5:00 PM",
    room: "Room 203",
  },
  {
    id: "c003",
    name: "12th Grade - Science",
    subjects: ["Physics", "Chemistry", "Biology"],
    teachers: ["Ms. Jane Smith", "Dr. Emily White"],
    schedule: "Tue-Thu, 9:00 AM - 1:00 PM",
    room: "Lab 1",
  },
  {
    id: "c004",
    name: "10th Grade - Batch B",
    subjects: ["Mathematics", "Computer Science"],
    teachers: ["Mr. John Doe"],
    schedule: "Mon-Fri, 1:00 PM - 4:00 PM",
    room: "Room 102",
  },
]

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentClass, setCurrentClass] = useState(null)
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    subjects: [],
    teachers: [],
    schedule: "",
    room: "",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSubject, setFilterSubject] = useState("")
  const [filterTeacher, setFilterTeacher] = useState("")

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleAddClass = () => {
    setCurrentClass(null)
    setFormState({ id: "", name: "", subjects: [], teachers: [], schedule: "", room: "" })
    setOpenDialog(true)
  }

  const handleEditClass = (classItem) => {
    setCurrentClass(classItem)
    setFormState({ ...classItem })
    setOpenDialog(true)
  }

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((item) => item.id !== id))
  }

  const handleFormChange = (field) => (event) => {
    setFormState({ ...formState, [field]: event.target.value })
  }

  const handleSubmitForm = () => {
    if (currentClass) {
      setClasses(
        classes.map((item) => (item.id === currentClass.id ? { ...formState, id: currentClass.id } : item))
      )
    } else {
      const newId = `c${(classes.length + 1).toString().padStart(3, "0")}`
      setClasses([...classes, { ...formState, id: newId }])
    }
    setOpenDialog(false)
  }

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.teachers.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesSubject = filterSubject === "" || item.subjects.includes(filterSubject)
      const matchesTeacher = filterTeacher === "" || item.teachers.includes(filterTeacher)
      return matchesSearch && matchesSubject && matchesTeacher
    })
  }, [classes, searchTerm, filterSubject, filterTeacher])

  const paginatedClasses = filteredClasses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box sx={{ padding: 3 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Class & Subject Management
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddClass}>
            Add New Class
          </Button>
        </Toolbar>
      </AppBar>

      <Paper sx={{ padding: 2, marginY: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search Classes"
              fullWidth
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Subject</InputLabel>
              <Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} label="Subject">
                <MenuItem value="">All</MenuItem>
                {allSubjects.map((subj) => (
                  <MenuItem key={subj} value={subj}>
                    {subj}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Teacher</InputLabel>
              <Select value={filterTeacher} onChange={(e) => setFilterTeacher(e.target.value)} label="Teacher">
                <MenuItem value="">All</MenuItem>
                {allTeachers.map((teach) => (
                  <MenuItem key={teach} value={teach}>
                    {teach}
                  </MenuItem>
                ))}
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
                <TableCell>Class Name</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell>Teachers</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Room</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClasses.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.subjects.map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ margin: 0.25 }} />
                    ))}
                  </TableCell>
                  <TableCell>
                    {item.teachers.map((t) => (
                      <Chip key={t} label={t} variant="outlined" size="small" sx={{ margin: 0.25 }} />
                    ))}
                  </TableCell>
                  <TableCell>{item.schedule}</TableCell>
                  <TableCell>{item.room}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleEditClass(item)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteClass(item.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedClasses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No classes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredClasses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
        />
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentClass ? "Edit Class" : "Add Class"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Class Name"
            margin="dense"
            value={formState.name}
            onChange={handleFormChange("name")}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Subjects</InputLabel>
            <Select
              multiple
              value={formState.subjects}
              onChange={handleFormChange("subjects")}
              input={<OutlinedInput label="Subjects" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {allSubjects.map((subj) => (
                <MenuItem key={subj} value={subj}>
                  {subj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Teachers</InputLabel>
            <Select
              multiple
              value={formState.teachers}
              onChange={handleFormChange("teachers")}
              input={<OutlinedInput label="Teachers" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} variant="outlined" />
                  ))}
                </Box>
              )}
            >
              {allTeachers.map((teach) => (
                <MenuItem key={teach} value={teach}>
                  {teach}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Schedule"
            margin="dense"
            value={formState.schedule}
            onChange={handleFormChange("schedule")}
          />
          <TextField
            fullWidth
            label="Room"
            margin="dense"
            value={formState.room}
            onChange={handleFormChange("room")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitForm}>
            {currentClass ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

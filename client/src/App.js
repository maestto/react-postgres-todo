import * as React from 'react'
import { Box, Button, List, ListItem, ListItemText, IconButton, MenuItem } from "@mui/material"
import { AddRounded, EditRounded, DeleteRounded } from '@mui/icons-material'

import { TextField, Dialog, DialogActions, DialogContent } from "@mui/material"

import axios from "./utils/axios";

const statusList = [
    {
        value: 'pending',
        label: 'Ожидает',
    },
    {
        value: 'in progress',
        label: 'В процессе',
    },
    {
        value: 'done',
        label: 'Выполнено',
    },
]

export default function App() {
    const [tasks, setTasks] = React.useState([])
    const [dialogOpenState, setDialogOpenState] = React.useState(false)

    const [formTaskID, setFormTaskID] = React.useState(-1)
    const [inputTaskTitle, setInputTaskTitle] = React.useState('')
    const [inputTaskDesc, setInputTaskDesc] = React.useState('')
    const [inputTaskStatus, setInputTaskStatus] = React.useState('pending')

    const handleDialogClose = () => {
        setDialogOpenState(false)
        setFormTaskID(-1)
        setInputTaskTitle('')
        setInputTaskDesc('')
        setInputTaskStatus('pending')
    }

    const handleDialogDone = () => {
        handleDialogClose()
        if(formTaskID < 0) {
            axios.post(`/task`, {
                title: inputTaskTitle,
                description: inputTaskDesc,
                status: inputTaskStatus
            }).then(() => getAllTasks())
        } else {
            axios.put(`/task`, {
                id: formTaskID,
                title: inputTaskTitle,
                description: inputTaskDesc,
                status: inputTaskStatus
            }).then(() => getAllTasks())
        }
    }

    const getAllTasks = () => {
        axios.get(`/task`).then(({ data }) => {
            setTasks(data)
        })
    }

    const deleteTask = (id) => {
        return axios.delete(`/task/${id}`).then(() => getAllTasks())
    }

    React.useEffect(() => {
        getAllTasks()
    }, [])

    return (
        <Box sx={{ margin: '20px' }}>
            <Button
                variant="contained"
                startIcon={<AddRounded />}
                onClick={() => setDialogOpenState(true)}
            >
                Новая задача
            </Button>
            <List>
                {
                    tasks.map((task, index) =>
                        <ListItem
                            key={index}
                            secondaryAction={
                                <div>
                                    <IconButton
                                        onClick = {
                                            () => {
                                                setFormTaskID(task.id)
                                                setInputTaskTitle(task.title)
                                                setInputTaskDesc(task.description)
                                                setInputTaskStatus(task.status)
                                                setDialogOpenState(true)
                                            }
                                        }
                                    >
                                        <EditRounded />
                                    </IconButton>
                                    <IconButton
                                        onClick = {
                                            () => deleteTask(task.id)
                                        }
                                    >
                                        <DeleteRounded />
                                    </IconButton>
                                </div>
                            }
                        >
                            <ListItemText
                                primary={`${task.id} | ${task.title} [${task.status}]`}
                                secondary={task.description ? task.description : "Пусто"}
                            />
                        </ListItem>
                    )
                }
            </List>
            <Dialog open={dialogOpenState}>
                <DialogContent>
                    <TextField
                        label="Название"
                        autoFocus
                        value={inputTaskTitle}
                        onChange={ event => setInputTaskTitle(event.target.value) }
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Описание"
                        multiline
                        value={inputTaskDesc}
                        onChange={ event => setInputTaskDesc(event.target.value) }
                        maxRows={4}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Статус"
                        select
                        value={inputTaskStatus}
                        onChange={ event => setInputTaskStatus(event.target.value) }
                        margin="normal"
                        fullWidth
                    >
                        {statusList.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                                {status.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отменить</Button>
                    <Button disabled={inputTaskTitle === ''} onClick={handleDialogDone}>Готово</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
import { Box, Button, Card, CardContent, IconButton, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, {useState} from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import apiCall from '../api/apiCall';
import { ToDo } from '../types/todoType';

const EditToDo = ({taskId,taskValue,priorityValue,status, EditModelClose, loadTodo}: any) => {
  const [task, setTask] = useState<string>(taskValue);
  const [priority, setPriority] = useState<string>(priorityValue);
    const handleSubmit = async (e: any) => {
      try {
        let payload = {
          id: taskId,
          task,
          priority,
          status
        };
        let response = await apiCall.put(`/todos/${taskId}`, payload);
        // console.log(response);
        EditModelClose(false)
        loadTodo()
       
      } catch (err: any) {
        // console.log(err.message);
      }
    };

    const handleChange = (
      e: React.MouseEvent<HTMLElement>,
      newPriority: string
    ) => {
      setPriority(newPriority);
    };
  return (
    <Box
          sx={{
            width: {
              sx: "250px",
              md: "550px",
            },
            // width:'500',
            position: "absolute",
            top: "35%",
            left: "30%",
            p: 2,
          }}
        >
          <Card>
            <Stack direction="row" justifyContent="end" pr={2} mb={-2} pt={1}>
              <IconButton onClick={() => EditModelClose(false)}>
                <ClearIcon />
              </IconButton>
            </Stack>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">Edit Task</Typography>
                <TextField
                  label="ToDo"
                  size="small"
                  sx={{ width: "75%" }}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <ToggleButtonGroup
                  color="primary"
                  value={priority}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="High">High</ToggleButton>
                  <ToggleButton value="Medium">Medium</ToggleButton>
                  <ToggleButton value="Low">Low</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </CardContent>
            {/* <CardActions sx={{border:'1px solid red'}}> */}
            <Stack direction="row" justifyContent="end" mr={2} mt={-1} pb={1}>
              <Button variant="contained" size="small" onClick={handleSubmit}>
                Edit ToDo
              </Button>
            </Stack>

            {/* </CardActions> */}
          </Card>
        </Box>
  )
}

export default EditToDo
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputLabel,
  Link,
  Modal,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useState } from "react";
import { ToDo } from "../types/todoType";
import { v4 as uuidv4 } from 'uuid';
import apiCall from "../api/apiCall";
import { Label } from "@mui/icons-material";

const AddToDo = ({loadTodo}: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>('High')
  const [task, setTask] = useState<string>('')
  const [todo, setTodo] = useState<ToDo | {}>({})

  const handleChange = (e: React.MouseEvent<HTMLElement>, newPriority: string)=>{
    setPriority(newPriority)
  }
  const handleSubmit = async(e: React.MouseEvent<HTMLElement>)=>{
    
    e.preventDefault()
        try{
            let payload: ToDo = {
                id: uuidv4(),
                task: task,
                priority: priority,
                status: "ToDo",
                createdAt: new Date()
            }
            // console.log(payload)
            let response = await apiCall.post('/todos',payload)
            // console.log(response)
            setModalOpen(false)
            loadTodo()
            
        }catch(err: any){
            // console.log(err.message)
        }
  }
  return (
    <Stack spacing={2} padding={2}>
        <Stack direction='row' spacing={2} justifyContent={"space-between"}>
        <Typography variant="h4">ToDo List</Typography>
        <Button variant='contained' size="small" onClick={(e: any)=> setModalOpen(true)}>Add ToDo</Button>
        </Stack>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        
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
              <IconButton onClick={() => setModalOpen(false)}>
                <ClearIcon />
              </IconButton>
            </Stack>
            <CardContent>
            <Stack spacing={2}>
            <Typography variant='h5'>Add Task</Typography>
        <TextField label='ToDo' size='small' sx={{width:'75%'}} onChange={(e)=>setTask(e.target.value)}/>
        {/* <Label>Priority</Label> */}
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
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
            <Button variant='contained' size='small'  onClick={handleSubmit}>Add ToDo</Button> 
            </Stack>

            {/* </CardActions> */}
          </Card>
        </Box>
      </Modal>
    </Stack>
  );
};

export default AddToDo;

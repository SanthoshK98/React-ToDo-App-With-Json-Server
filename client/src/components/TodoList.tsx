import React, { useState, useEffect } from "react";
import { ToDo } from "../types/todoType";
import apiCall from "../api/apiCall";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import {uuid} from 'uuidv4'
import { v4 as uuidv4 } from "uuid";
import AddToDo from "./AddToDo";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteToDo from "./DeleteToDo";
import EditToDo from "./EditToDo";

const TodoList = ({todos,error, loadTodo} : any) => {

  const [task, setTask] = useState<string>("");
  const [status, setStatus] = useState<string>("ToDo");
  const [progress, setProgress] = useState<number>(1);
  const [taskId, setTaskId] = useState<string>("");
  const [deleteId, setDeleteId] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>("High");
 

  const editHandler = async (todo: ToDo) => {
    setModalOpen(true);
    setTask(todo?.task as string);
    setPriority(todo?.priority as string);
    setTaskId(todo.id as string);
    setStatus(todo.status as string)
  };

  const EditModelClose = (value: boolean) => {

      setModalOpen(value);

  };

  const deleteHandler = (todo: ToDo) => {
    setModalDeleteOpen(true);
    setDeleteId(todo.id as string);
  };

  const deleteToDoHandler = (value: boolean) => {
   
      setModalDeleteOpen(value);
    
  };

  const statusChange = async (e: any, todo: any) => {
    try {
      // console.log(e.target.value);
      // console.log(todo);
      setStatus(e.target.value);
      const payload = {
        ...todo,
        status: e.target.value,
      };
      let response = await apiCall.put(`/todos/${todo.id}`, payload);
      // console.log(response);
      loadTodo()

    } catch (err: any) {
      // console.log(err.message);
    }
  };


  return (
    <div>
      { error ? (<h3>Something Went Wrong</h3>) : (todos.length >= 1 ? (
        todos.map((todo: ToDo) => {
          return (
            <Stack
              spacing={2}
              key={todo.id as any}
              width="80%"
              justifyContent="center"
            >
              <Paper
                elevation={3}
                sx={{
                  margin: "20px",
                  padding: "20px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <Stack direction="row" justifyContent={"space-around"}>
                  <Typography variant="h5" component="div" sx={{width: "100px"}}>
                    {todo.task}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{width: "100px"}}>
                    {todo.priority}
                  </Typography>
                  {/* <InputLabel id="demo-simple-select-label">ToDo</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={todo.status}
                    label="Age"
                    onChange={(e) => statusChange(e, todo)}
                    sx={{
                        width:"100px"
                    }}
                  >
                    <MenuItem value="ToDo">ToDo</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                  {todo.status === "InProgress" ? (
                    <CircularProgress variant="determinate" value={50} />
                  ) : todo.status === "Done" ? (
                    <CircularProgress variant="determinate" value={100} />
                  ) : (
                    <CircularProgress variant="determinate" value={25} />
                  )}

                  <IconButton
                    aria-label="delete"
                    onClick={() => editHandler(todo)}
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteHandler(todo)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Paper>
            </Stack>
          );
        })
      ) : (
        <h2>Loading.........</h2>
      ))}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <EditToDo taskId={taskId} taskValue={task} priorityValue={priority} status={status} EditModelClose={EditModelClose} loadTodo={loadTodo}/>
      </Modal>

      <Modal open={modalDeleteOpen} onClose={() => setModalDeleteOpen(false)}>
       <DeleteToDo deleteId={deleteId} deleteToDoHandler={deleteToDoHandler} loadTodo={loadTodo}/>
      </Modal>
    </div>
  );
};

export default TodoList;

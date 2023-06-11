import { Box, Card, CardContent, Stack, Typography, Button } from '@mui/material'
import React from 'react'
import apiCall from '../api/apiCall';

const DeleteToDo = ({deleteToDoHandler,deleteId,loadTodo}: any) => {
    const deleteToDo = async (e: any) => {
        try {
          let response = await apiCall.delete(`/todos/${deleteId}`);
          // console.log(response);
        //   setModalDeleteOpen(false);
          deleteToDoHandler(false)
          loadTodo();
        } catch (err: any) {
          // console.log(err.message);
        }
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
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">
                  Are you sure, You want to delete ToDo ?
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" onClick={deleteToDo}>
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => deleteToDoHandler(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
  )
}

export default DeleteToDo
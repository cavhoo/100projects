import React, {
  useState,
  ChangeEvent
} from 'react';

import {
  TextField,
  Typography,
  Button,
  makeStyles,
  List,
  Paper,
  ThemeProvider,
  createMuiTheme,
  Container
} from '@material-ui/core'

import Todo, { TodoStatus } from './Todo'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const useStyles = makeStyles({
  createTodoContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: '15px'
    }
  }
})

interface Todo {
  id: number
  title: string
  content: string
  status: TodoStatus
}


function App() {
  const getNextId = () => {
    return todos.length > 0 ? todos[todos.length - 1].id + 1 : 0
  }
 
  const [todos, setTodos] = useState([] as Todo[])
  const [newTodo, updateNewTodo] = useState({
    id: -1,
    title: '',
    content: '',
    status: TodoStatus.TODO
  } as Todo)

  const onUpdateNewTitle = (event: ChangeEvent<HTMLInputElement>) => {
    updateNewTodo({
      ...newTodo,
      title: event.target.value
    })
  }

  const onUpdateNewContent = (event: ChangeEvent<HTMLInputElement>) => {
    updateNewTodo({
      ...newTodo,
      content: event.target.value
    })
  }

  const onUpdateTodoStatus = (status: TodoStatus, id: number) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status
        }
      }
      return todo
    }))
  }

  const onAddTodo = () => {
    setTodos([
      ...todos,
      {
        ...newTodo,
        id: getNextId()
      }
    ])
    updateNewTodo({
      id: -1,
      title: '',
      content: '',
      status: TodoStatus.TODO
    })
  }

  const onDeleteTodo = (id: number) => {
    const newTodos = [...todos]
    const deleteIdx = newTodos.findIndex((todo) => todo.id === id)
    newTodos.splice(deleteIdx, 1)
    setTodos(newTodos)
  }

  
  const onClear = () => {
    updateNewTodo({
      id: -1,
      title: '',
      content: '',
      status: TodoStatus.TODO
    })
  }

  const classes = useStyles()

  return (
    <ThemeProvider
      theme={theme}
    >
      <Container
        style={{backgroundColor: theme.palette.background.default, height: '100vh'}}
      >
        <Typography
          color='primary'
          variant='h4'
        >
          Todos
        </Typography>
        {
          todos.length > 0 && (
            <Paper>
              <List
                component='nav'
              >
                {
                  todos.map(({id, title, content, status}) => (
                    <Todo
                      key={id}
                      id={id}
                      title={title}
                      content={content}
                      status={status}
                      onDelete={onDeleteTodo}
                      onUpdateStatus={onUpdateTodoStatus}
                    />
                  ))
                }
              </List>
            </Paper>
          )
        }
        <div
          className={classes.createTodoContainer}
        >
          <TextField
            onChange={onUpdateNewTitle}
            placeholder='Title'
            value={newTodo.title}
          />
          <TextField
            onChange={onUpdateNewContent}
            placeholder='Description'
            color='secondary'
            value={newTodo.content}
          />
          <Button
            color='primary'
            onClick={onAddTodo}
            variant='contained'
          >
            Add Todo
          </Button>
          <Button
            color='secondary'
            onClick={onClear}
            variant='contained'
          >
            Clear
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;

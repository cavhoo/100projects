import React from 'react'
import {
  ListItem,
  ListItemText,
  Button,
  IconButton,
  ListItemIcon
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'


export enum TodoStatus {
  TODO,
  BLOCKED,
  DONE
}

export interface TodoProps {
  id: number
  title: string
  content: string
  status: TodoStatus
  onUpdateStatus: (status: TodoStatus, id: number) => void
  onDelete: (id:number) => void
}

const Status = {
  [TodoStatus.BLOCKED]: () => <span>Blocked</span>,
  [TodoStatus.DONE]: () => <span>Done</span>,
  [TodoStatus.TODO]: () => <span>Todo</span>
}

export default function Todo({
  id,
  title,
  content,
  status,
  onUpdateStatus,
  onDelete
}: TodoProps) {

  const StatusFlag = Status[status]

  const handleChangeStatus = () => {
    if (status === TodoStatus.TODO) {
      onUpdateStatus(TodoStatus.DONE, id)
    } else if (status === TodoStatus.DONE) {
      onUpdateStatus(TodoStatus.BLOCKED, id)
    } else {
      onUpdateStatus(TodoStatus.TODO, id)
    }
  }

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <ListItem>
      <ListItemIcon>
        <IconButton
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
      <ListItemText>{content}</ListItemText>
      <Button
        color='primary'
        variant='contained'
        onClick={handleChangeStatus}
      >
        <StatusFlag />
      </Button>
    </ListItem>
  )
}

import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task._id}
          secondaryAction={
            <>
              <IconButton edge="end" onClick={() => onUpdate(task._id, { status: "done" })}><EditIcon /></IconButton>
              <IconButton edge="end" onClick={() => onDelete(task._id)}><DeleteIcon /></IconButton>
            </>
          }
        >
          <ListItemText
            primary={task.title}
            secondary={`${task.description || ""} — ${task.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
}

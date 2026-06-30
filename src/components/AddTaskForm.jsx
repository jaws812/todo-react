import Field from "./Field";
import Button from "./Button";
import {useContext} from "react";
import {TasksContext} from "../context/TasksContext";

const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext)

  // Если передавать onSubmit={addTask} то браузер обновит страницу, поэтому
  // добавляем функцию с отменой действий браузера по умолчанию
  const onSubmit = (event) => {
    event.preventDefault()
    addTask()
  }

  return (
    <form
      className="todo__form"
      onSubmit={onSubmit}
    >
      <Field
        className="todo__field"
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        onInput={(event) => setNewTaskTitle(event.target.value)}
        ref={newTaskInputRef}
      />
      <Button type={"submit"}>Add</Button>
    </form>
  )
}

export default AddTaskForm
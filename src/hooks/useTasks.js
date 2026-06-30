import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const {
    savedTasks,
    saveTasks,
  } = useTasksLocalStorage()

  const [tasks, setTasks] = useState(savedTasks ?? [
    {id: 'task-1', title: 'Купить молоко', isDone: false},
    {id: 'task-2', title: 'Погладить кнопу', isDone: true},
  ])

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const newTaskInputRef = useRef(null)

  // Удаление всех задач, функция передается пропсом в TodoInfo
  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are u sure u wanna to deleted all?')

    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  // Удаление задачи, передается в пропсе в TodoList
  const deleteTask = useCallback((taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }, [tasks])

  // Переключение выполненных задач, передается в пропсе в TodoList
  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, isDone}
        }

        return task
      })
    )
  }, [tasks])

  // Фильрация по задачам, query - введенный текст
  // const filterTasks = (query) => {
  //   console.log(`Search: ${query}`)
  // }

  // Функция обрабатывает добавление новой задачи
  const addTask = useCallback((title) => {
    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      isDone: false,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
    setNewTaskTitle('')
    setSearchQuery('')
    newTaskInputRef.current.focus()
  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
      : null
  }, [searchQuery, tasks])

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  }
}

export default useTasks
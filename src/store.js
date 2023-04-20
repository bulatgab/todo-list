import {generateId} from './id.js'

const allTasks = [
  {
    id: generateId(),
    title: 'my task 1',
    isComplete: false,
    dueDate: new Date('2024-12-31')
  },
]

const filters = {
  isComplete: false,
}

export function getTasks() {
  return allTasks
}

export function getTasksToDisplay() {
  return allTasks
    .filter(todo => todo.isComplete === filters.isComplete)
}

export function toggleTask(taskId) {
  const currentTask = allTasks.find(({id}) => id === taskId)
  if (currentTask === undefined) {
    console.error('todo is not found with id:', taskId)
    return
  }
  currentTask.isComplete = !currentTask.isComplete
}

export function addTask(title) {
  const newTodo = {
    id: generateId(),
    title,
    isComplete: false,
    dueDate: new Date('2024-12-31')
  }
  allTasks.push(newTodo)
}

export function deleteTask(taskId) {
  const index = allTasks.findIndex(task => task.id === taskId)
  if (index < 0) {
    console.error('todo is not found with id:', taskId)
    return
  }
  allTasks.splice(index, 1)
}

export function setIsCompleteFilter(value) {
  filters.isComplete = value
}

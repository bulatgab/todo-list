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
  completeness: 'incomplete',
  query: '',
}

export function getTasksToDisplay() {
  return allTasks
    .filter(isMatchForCompletenessFilter)
    .filter(isMatchForSearchQuery)
}

function isMatchForCompletenessFilter(task) {
  const showAll = filters.completeness === 'all'
  const showIncompleteOnly = filters.completeness === 'incomplete'
  const showCompleteOnly = filters.completeness === 'complete'

  return showAll || (showCompleteOnly && task.isComplete) || (showIncompleteOnly && !task.isComplete)
}

function isMatchForSearchQuery(task) {
  return task.title.trim().toLowerCase()
    .includes(filters.query.trim().toLowerCase())
}

export function toggleTask(taskId) {
  const currentTask = allTasks.find(({id}) => id === taskId)
  if (currentTask === undefined) {
    console.error('task is not found with id:', taskId)
    return
  }
  currentTask.isComplete = !currentTask.isComplete
}

export function addTask(title) {
  const newTask = {
    id: generateId(),
    title,
    isComplete: false,
    dueDate: new Date('2024-12-31')
  }
  allTasks.push(newTask)
}

export function deleteTask(taskId) {
  const index = allTasks.findIndex(task => task.id === taskId)
  if (index < 0) {
    console.error('task is not found with id:', taskId)
    return
  }
  allTasks.splice(index, 1)
}

export function setCompletenessFilter(value) {
  filters.completeness = value
}

export function setSearchQuery(value) {
  filters.query = value
}

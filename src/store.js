import moment from 'moment';
import {generateId} from './id.js'

const allTasks = [
  {
    id: generateId(),
    title: 'my task 1',
    isComplete: false,
    dueDate: '2024-12-31',
  },
]

const filters = {
  completeness: 'all',
  query: '',
  dueDate: 'all',
}

export function getTasksToDisplay() {
  return allTasks
    .filter(isMatchForCompletenessFilter)
    .filter(isMatchForSearchQuery)
    .filter(isMatchForDueDateFilter)
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

function isMatchForDueDateFilter(task) {
  const momentDate = moment(task.dueDate)
  const today = moment().startOf('day')
  const tomorrow = moment().add(1, 'day').startOf('day')

  const isExpired = momentDate.isBefore(today)
  const isToday = momentDate.isSame(today, 'day')
  const isTomorrow = momentDate.isSame(tomorrow, 'day')
  const isLater = momentDate.isAfter(tomorrow)

  const showAll = filters.dueDate === 'all'
  const showExpired = filters.dueDate === 'expired'
  const showToday = filters.dueDate === 'today'
  const showTomorrow = filters.dueDate === 'tomorrow'
  const showLater = filters.dueDate === 'later'

  return showAll || (showExpired && isExpired) || (showToday && isToday) || (showTomorrow && isTomorrow) || (showLater && isLater)
}

export function toggleTask(taskId) {
  const currentTask = allTasks.find(({id}) => id === taskId)
  if (currentTask === undefined) {
    console.error('task is not found with id:', taskId)
    return
  }
  currentTask.isComplete = !currentTask.isComplete
}

export function addTask({title, dueDate}) {
  const newTask = {
    id: generateId(),
    title,
    dueDate,
    isComplete: false,
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

export function setDueDateFilter(value) {
  filters.dueDate = value
}

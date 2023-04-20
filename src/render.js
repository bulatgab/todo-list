import {getTasksToDisplay} from './store.js'
import {createElementForTask} from './createElementForTask.js'

const tasksEl = document.querySelector('#task-list')

export function renderTasks() {
  clearList()

  const tasksToDisplay = getTasksToDisplay()

  if (tasksToDisplay.length === 0) {
    tasksEl.appendChild(createEmptyListWarning())
  } else {
    tasksToDisplay.forEach(task => {
      tasksEl.appendChild(createElementForTask(task))
    })
  }
}

function clearList() {
  while (tasksEl.firstChild !== null) {
    tasksEl.removeChild(tasksEl.firstChild)
  }
}

function createEmptyListWarning() {
  const el = document.createElement('li')
  el.innerText = 'No tasks exist or match the criteria'
  return el
}

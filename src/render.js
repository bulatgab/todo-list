import {deleteTask, getTasksToDisplay, toggleTask} from './store.js'

const tasksEl = document.querySelector('#task-list')

export function renderTasks() {
  // clear all
  while (tasksEl.firstChild !== null) {
    tasksEl.removeChild(tasksEl.firstChild)
  }

  const tasksToDisplay = getTasksToDisplay()

  // check if nothing to display
  if (tasksToDisplay.length === 0) {
    const emptyListWarningEl = document.createElement('li')
    emptyListWarningEl.innerText = 'No tasks exist or match the criteria'
    tasksEl.appendChild(emptyListWarningEl)
    return
  }

  // rerender all
  tasksToDisplay.forEach(task => {
    const newEl = createElementForTask(task)
    tasksEl.appendChild(newEl)
  })
}

function createElementForTask(task) {
  // container
  const newEl = document.createElement('li')
  newEl.setAttribute('class', 'flex flex-row gap-2 my-2')

  // checkbox
  const newCheckbox = document.createElement('input')
  newCheckbox.setAttribute('type', 'checkbox')
  newCheckbox.setAttribute('id', `task-${task.id}`)
  newCheckbox.setAttribute('class', 'mr-3')
  if (task.isComplete) {
    newCheckbox.setAttribute('checked', true)
  }
  newCheckbox.addEventListener('click', () => {
    toggleTask(task.id)
    renderTasks()
  })
  newEl.appendChild(newCheckbox)

  // label
  const newLabel = document.createElement('label')
  newLabel.setAttribute('for', `task-${task.id}`)
  newLabel.setAttribute('class', 'flex-1 self-center')
  newLabel.innerText = task.title
  newEl.appendChild(newLabel)

  // due date badge
  // const newDueDate

  // delete button
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.setAttribute('class', 'bg-rose-600 p-2 rounded-sm')
  deleteButton.addEventListener('click', () => {
    deleteTask(task.id)
    renderTasks()
  })
  newEl.appendChild(deleteButton)

  return newEl
}

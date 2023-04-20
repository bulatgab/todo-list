import {deleteTask, toggleTask} from './store.js'
import {renderTasks} from './render.js'

export function createElementForTask(task) {
  const el = createTaskContainer()
  el.appendChild(createCheckbox(task))
  el.appendChild(createLabel(task))
  el.appendChild(createDeleteButton(task))
  return el
}

function createTaskContainer() {
  const el = document.createElement('li')
  el.setAttribute('class', 'flex flex-row gap-2 my-2')
  return el
}

function createCheckbox(task) {
  const el = document.createElement('input')
  el.setAttribute('type', 'checkbox')
  el.setAttribute('id', `task-${task.id}`)
  el.setAttribute('class', 'mr-3')
  if (task.isComplete) {
    el.setAttribute('checked', true)
  }
  el.addEventListener('click', () => {
    toggleTask(task.id)
    renderTasks()
  })
  return el
}

function createLabel(task) {
  const el = document.createElement('label')
  el.setAttribute('for', `task-${task.id}`)
  el.setAttribute('class', 'flex-1 self-center')
  el.innerText = task.title
  return el
}

function createDeleteButton(task) {
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.setAttribute('class', 'bg-rose-600 p-2 rounded-sm')
  deleteButton.addEventListener('click', () => {
    deleteTask(task.id)
    renderTasks()
  })
  return deleteButton
}

import {addTask} from './store.js'
import {renderTasks} from './renderTasks.js'

const titleInput = document.querySelector('#add-task-title-input')
const submitButton = document.querySelector('#add-task-button')
const dueDateInput = document.querySelector('#add-task-due-date-input')
const validationError = document.querySelector('#add-task-validation-error')

titleInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    addTaskAndUpdateUi()
  }
})
submitButton.addEventListener('click', addTaskAndUpdateUi)

function addTaskAndUpdateUi() {
  if (titleInput.value === '' || dueDateInput.value === '') {
    setValidationError('Cannot create a task without a title and/or a due date')
  } else {
    addTask({title: titleInput.value, dueDate: dueDateInput.value})
    renderTasks()
    clearAddTaskInputs()
    clearValidationError()
  }
}

function clearAddTaskInputs() {
  titleInput.value = ''
  dueDateInput.value = ''
}

titleInput.addEventListener('input', clearValidationError)
dueDateInput.addEventListener('change', clearValidationError)

function clearValidationError() {
  validationError.innerText = ''
}

function setValidationError(value) {
  validationError.innerText = value
}

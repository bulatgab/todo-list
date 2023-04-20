import {addTask, deleteTask, getTasksToDisplay, setIsCompleteFilter, toggleTask} from './src/store.js'

const todosEl = document.querySelector('#todos')
const selectIsComplete = document.querySelector('#select-is-complete')
selectIsComplete.addEventListener('change', event => {
  setIsCompleteFilter(event.target.value === 'complete')
  renderTasks()
})

function renderTasks() {
  // clear all
  while (todosEl.firstChild !== null) {
    todosEl.removeChild(todosEl.firstChild)
  }

  const tasksToDisplay = getTasksToDisplay()

  // check if nothing to display
  if (tasksToDisplay.length === 0) {
    const emptyListWarningEl = document.createElement('li')
    emptyListWarningEl.innerText = 'No tasks exist or match the criteria'
    todosEl.appendChild(emptyListWarningEl)
    return
  }

  // rerender all
  tasksToDisplay.forEach(task => {
    const newEl = createElementForTodo(task)
    todosEl.appendChild(newEl)
  })
}

function createElementForTodo(todo) {
  // container
  const newEl = document.createElement('li')
  newEl.setAttribute('class', 'flex flex-row gap-2 my-2')

  // checkbox
  const newCheckbox = document.createElement('input')
  newCheckbox.setAttribute('type', 'checkbox')
  newCheckbox.setAttribute('id', `todo-${todo.id}`)
  newCheckbox.setAttribute('class', 'mr-3')
  if (todo.isComplete) {
    newCheckbox.setAttribute('checked', true)
  }
  newCheckbox.addEventListener('click', () => {
    toggleTask(todo.id)
    renderTasks()
  })
  newEl.appendChild(newCheckbox)

  // label
  const newLabel = document.createElement('label')
  newLabel.setAttribute('for', `todo-${todo.id}`)
  newLabel.setAttribute('class', 'flex-1 self-center')
  newLabel.innerText = todo.title
  newEl.appendChild(newLabel)

  // due date badge
  // const newDueDate

  // delete button
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.setAttribute('class', 'bg-rose-600 p-2 rounded-sm')
  deleteButton.addEventListener('click', () => {
    deleteTask(todo.id)
    renderTasks()
  })
  newEl.appendChild(deleteButton)

  return newEl
}

const addTaskInput = document.querySelector('#add-task-input')
const addTaskButton = document.querySelector('#add-task-button')
addTaskInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    addTaskAndUpdateUi()
  }
})
addTaskButton.addEventListener('click', () => {
  addTaskAndUpdateUi()
})
function addTaskAndUpdateUi() {
  addTask(addTaskInput.value)
  addTaskInput.value = ''
  renderTasks()
}

renderTasks()

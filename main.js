import {generateId} from './src/id.js'

const allTodos = [
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

const todosEl = document.querySelector('#todos')
const selectIsComplete = document.querySelector('#select-is-complete')
selectIsComplete.addEventListener('change', event => {
  filters.isComplete = (event.target.value === 'complete')
  renderTodos()
})

function renderTodos() {
  // clear all
  while (todosEl.firstChild !== null) {
    todosEl.removeChild(todosEl.firstChild)
  }

  // apply filters
  const todosToDisplay = allTodos
    .filter(todo => todo.isComplete === filters.isComplete)

  // check if nothing to display
  if (todosToDisplay.length === 0) {
    const emptyListWarningEl = document.createElement('li')
    emptyListWarningEl.innerText = 'No tasks exist or match the criteria'
    todosEl.appendChild(emptyListWarningEl)
    return
  }

  // rerender all
  todosToDisplay.forEach(todo => {
    const newEl = createElementForTodo(todo)
    todosEl.appendChild(newEl)
  })
}

function createElementForTodo(todo) {
  // container
  const newEl = document.createElement('li')

  // checkbox
  const newCheckbox = document.createElement('input')
  newCheckbox.setAttribute('type', 'checkbox')
  newCheckbox.setAttribute('id', `todo-${todo.id}`)
  newCheckbox.setAttribute('class', 'mr-3')
  if (todo.isComplete) {
    newCheckbox.setAttribute('checked', true)
  }
  newCheckbox.addEventListener('click', () => {
    const currentTodo = allTodos.find(({id}) => id === todo.id)
    if (currentTodo === undefined) {
      console.error('todo is not found with id:', todo.id)
      return
    }
    currentTodo.isComplete = !currentTodo.isComplete
    renderTodos()
  })
  newEl.appendChild(newCheckbox)

  // label
  const newLabel = document.createElement('label')
  newLabel.setAttribute('for', `todo-${todo.id}`)
  newLabel.innerText = todo.title
  newEl.appendChild(newLabel)

  // due date badge
  // const newDueDate

  return newEl
}

const addTaskInput = document.querySelector('#add-task-input')
const addTaskButton = document.querySelector('#add-task-button')
addTaskButton.addEventListener('click', () => {
  const newTodo = {
    id: generateId(),
    title: addTaskInput.value,
    isComplete: false,
    dueDate: new Date('2024-12-31')
  }
  allTodos.push(newTodo)

  addTaskInput.value = ''
  renderTodos()
})

renderTodos()

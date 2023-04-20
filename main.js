import {addTask, setCompletenessFilter, setDueDateFilter, setSearchQuery} from './src/store.js'
import {renderTasks} from './src/renderTasks.js'

const searchInput = document.querySelector('#search-input')
searchInput.addEventListener('input', event => {
  setSearchQuery(event.target.value)
  renderTasks()
})

const completenessFilterSelect = document.querySelector('#completeness-filter-select')
completenessFilterSelect.addEventListener('change', event => {
  setCompletenessFilter(event.target.value)
  renderTasks()
})

const dueDateFilterSelect = document.querySelector('#due-date-filter-select')
dueDateFilterSelect.addEventListener('change', event => {
  setDueDateFilter(event.target.value)
  renderTasks()
})

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

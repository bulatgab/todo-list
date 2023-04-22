import {setCompletenessFilter, setDueDateFilter, setSearchQuery} from './src/store.js'
import {renderTasks} from './src/renderTasks.js'
import './src/addTask.js'

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

renderTasks()

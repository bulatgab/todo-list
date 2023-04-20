import {addTask, setCompletenessFilter} from './src/store.js'
import {renderTasks} from './src/render.js'

const completenessFilterSelect = document.querySelector('#completeness-filter-select')
completenessFilterSelect.addEventListener('change', event => {
  // all | complete | incomplete
  setCompletenessFilter(event.target.value)
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

import { dataActive, dataArchived, summaryData } from './components/data.js'
import { renderTableList } from './components/renderTableList.js'
import { renderSummaryList } from './components/renderSummaryList.js'
import { renderModal } from './components/renderModal.js'

const tableList = document.querySelector('.notes-table')
const summaryList = document.querySelector('.summary-table')
const container = document.querySelector('.container')
const createNoteBtn = document.querySelector('#create-note')
const activeBtn = document.querySelector('#active')
const archivedBtn = document.querySelector('#archived')
let data = dataActive

activeBtn.addEventListener('click', () => getDataType(dataActive))
archivedBtn.addEventListener('click', () => getDataType(dataArchived))

createNoteBtn.addEventListener('click', () => {
   renderModal()
   const btnOK = document.querySelector('#btnOK')
   const btnCancel = document.querySelector('#btnCancel')

   btnCancel.addEventListener('click', () => document.querySelector('.modal').remove())
   btnOK.addEventListener('click', () => {
      addNoteInDataList(dataActive)
      document.querySelector('.modal').remove()
      render()
   })
})

container.addEventListener('click', (event) => {
   if (event.target.className === 'icon-edit') {
      console.log('edit')
      console.log(dataActive)
   }
   // archive all notes
   if (event.target.className === 'header-icon-archive') {
      archiveAllNote()
   }
   // archive selected note
   if (event.target.className === 'icon-archive') {
      archiveNoteById(event.target.parentElement.id)
   }
   // delete selected note
   if (event.target.className === 'icon-delete') {
      deleteNoteById(data, event.target.parentElement.id)
      render()
   }
   // delete all notes
   if (event.target.className === 'header-icon-delete') {
      deleteAllNotes(data)
      render()
   }
})

render()
calculateSummaryList(dataActive, dataArchived, summaryData)

// counting actual data in a summary table list
function calculateSummaryList(dataActive, dataArchived, summaryData) {
   let activeObj = getDataForSummaryList(dataActive)
   let archivedObj = getDataForSummaryList(dataArchived)

   for (let i = 0; i < summaryData.length; i++) {
      if (summaryData[i].category === "Task") {
         summaryData[i].active = activeObj["Task"]
         summaryData[i].archived = archivedObj["Task"]
      }
      if (summaryData[i].category === "Random Thought") {
         summaryData[i].active = activeObj["Random Thought"]
         summaryData[i].archived = archivedObj["Random Thought"]
      }
      if (summaryData[i].category === "Idea") {
         summaryData[i].active = activeObj["Idea"]
         summaryData[i].archived = archivedObj["Idea"]
      }
   }
   render()
}
// delete note by id in data
function deleteNoteById(data, id) {
   let removed = []
   for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
         removed = data.splice(i, 1)
      }
   }
   calculateSummaryList(dataActive, dataArchived, summaryData)
   return removed
}
// delete all notes in data
function deleteAllNotes(data) {
   data.length = 0
   calculateSummaryList(dataActive, dataArchived, summaryData)
}
// render all tableList
function render() {
   renderTableList(data, tableList)
   renderSummaryList(summaryData, summaryList)
}
// helper function for calculateSummaryList()
function getDataForSummaryList(data) {
   return data.reduce((ac, item) => {
      if (item.category === "Task") return { ...ac, "Task": ac["Task"] + 1 }
      if (item.category === "Random Thought") return { ...ac, "Random Thought": ac["Random Thought"] + 1 }
      if (item.category === "Idea") return { ...ac, "Idea": ac["Idea"] + 1 }
   }, {
      "Task": 0,
      "Random Thought": 0,
      "Idea": 0
   })
}
// function for show current data for tableList
function getDataType(dataType) {
   data = dataType
   render()
}
// function for archivated notes
function archiveNoteById(id) {
   data !== dataArchived
      ? dataArchived.push(...deleteNoteById(data, id))
      : dataActive.push(...deleteNoteById(data, id))
   calculateSummaryList(dataActive, dataArchived, summaryData)
}
// function all archivated notes
function archiveAllNote() {
   console.log('archive all')
   data !== dataArchived
      ? dataArchived.push(...data.splice(0, data.length))
      : dataActive.push(...data.splice(0, data.length))
   calculateSummaryList(dataActive, dataArchived, summaryData)
}
// create note in form
function createNoteInForm() {
   const modal = document.querySelector('#formData')
   let date = new Date()
   let options = { month: 'long', day: 'numeric', year: 'numeric' }
   const dataNote = {
      id: String(date.getTime()),
      name: modal[0].value,
      created: date.toLocaleDateString('en-US', options),
      category: modal[1].value,
      content: modal[2].value,
      dates: ""
   }
   return dataNote
}
// add new note in a data storage
function addNoteInDataList(data) {
   data.push(createNoteInForm())
}












// функция с регулярным выражением по поиску даты
// модальное окно для редактирования заметки

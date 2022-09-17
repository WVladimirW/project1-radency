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
   addListenerForModal()
})

container.addEventListener('click', (event) => {
   // edit selected note
   if (event.target.className === 'icon-edit') {
      let note = getNoteForEdit(data, event.target.parentElement.id)
      renderModal(note)
      addListenerForModal(note)
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
   }
   // delete all notes
   if (event.target.className === 'header-icon-delete') {
      deleteAllNotes(data)
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
function createOrEditNoteInForm(note) {
   const modal = document.querySelector('#formData')
   let date = new Date()
   let options = { month: 'long', day: 'numeric', year: 'numeric' }
   const dataNote = {
      id: note?.id || String(date.getTime()),
      name: modal[0].value,
      created: note?.created || date.toLocaleDateString('en-US', options),
      category: modal[1].value,
      content: modal[2].value,
      dates: note?.dates || parseDate(modal[2].value)
   }
   return dataNote
}
// add new note in a data storage
function addNoteInDataList(data, note) {
   if (note === undefined) {
      data.push(createOrEditNoteInForm(note))
   } else {
      for (let i = 0; i < data.length; i++) {
         if (data[i].id === note.id) {
            data[i] = createOrEditNoteInForm(note)
         }
      }
   }
}
// get note for edit in list
function getNoteForEdit(note, id) {
   for (let i = 0; i < data.length; i++) {
      if (note[i].id === id) {
         return note[i]
      }
   }
}
function addListenerForModal(note) {
   const btnOK = document.querySelector('#btnOK')
   const btnCancel = document.querySelector('#btnCancel')

   btnCancel.addEventListener('click', () => document.querySelector('.modal').remove())
   btnOK.addEventListener('click', () => {
      addNoteInDataList(dataActive, note)
      document.querySelector('.modal').remove()
      render()
   })
}
// regular expression for date
function parseDate(str) {
   var m = str.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/g);
   return m ? m.join(", ") : ""
}
export function renderModal(note) {
   let div = document.createElement("div")
   div.classList = "modal"
   div.innerHTML = `<form id="formData" action="">
      <label for="name-note">
         <p>Name Note</p>
         <input id="name-note" type="text" value="${!!note ? note.name : ""}">
      </label>
      <label for="category">
         <p>Category</p>
         <select id="category" selected="${!!note ? note.category : "Task"}">
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
         </select>
      </label>
      <label for="content-note">
         <p>Content Note</p>
         <textarea id="content-note" cols="30" rows="5">${!!note ? note.content : ""}</textarea>
      </label>
   </form>
   <button id="btnOK" class="modal-button">OK</button>
   <button id="btnCancel" class="modal-button">Cancel</button>`
   document.body.append(div)
}
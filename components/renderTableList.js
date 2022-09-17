export function renderTableList(data, tableList) {
   const arr = [...tableList.children]
   arr.filter((item, index) => index === 0 ? item : item.remove())
   return data.map(item => {
      let div = document.createElement("div")
      div.id = item.id
      div.classList = "list-item-notes"
      div.innerHTML = `<div class="icon-${item.category.toLowerCase().split(' ').join('-')}"></div>
      <div class="name">${item.name}</div>
      <div class="created">${item.created}</div>
      <div class="category">${item.category}</div>
      <div class="content">${item.content}</div>
      <div class="dates">${item.dates}</div>
      <div class="icon-edit"></div>
      <div class="icon-archive"></div>
      <div class="icon-delete"></div>`
      tableList.append(div)
   })
}
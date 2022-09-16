export function renderSummaryList(summaryData, summaryList) {
   const arr = [...summaryList.children]
   arr.filter((item, index) => index === 0 ? item : item.remove())
   return summaryData.map(item => {
      let div = document.createElement("div")
      div.classList = "summary-list-item-notes"
      div.innerHTML = `<div class="icon-${item.category.toLowerCase().split(' ').join('-')}"></div>
      <div class="summary-category">${item.category}</div>
      <div class="summary-active">${item.active}</div>
      <div class="summary-archived">${item.archived}</div>`
      summaryList.append(div)
   })
}
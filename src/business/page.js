const updateUrl = (list) => {
  history.replaceState({}, document.title, list.id)
}

const updateTitle = (list) => {
  document.title = list.title ? `📝 ${list.title} - Checkita` : '📝 Checkita'
}

export { updateUrl, updateTitle }
